import * as React from 'react'
import * as ReactDOM from 'react-dom'

/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
import { setFormSettings, getFormSettings } from './modules/settings'
import { urlExport } from './modules/urlExport'
// ---------------------------------
// @ts-ignore
const figmaUIApi: UIAPI = parent as UIAPI
// elements
const settingsForm: HTMLFormElement = document.getElementById('settingsForm') as HTMLFormElement
const saveButton: HTMLButtonElement = document.getElementById('saveButton') as HTMLButtonElement
const cancelButton: HTMLButtonElement = document.getElementById('cancelButton') as HTMLButtonElement
const versionNotice: HTMLDivElement = document.getElementById('versionNotice') as HTMLDivElement
// download link
const downloadLink: HTMLLinkElement = document.getElementById('downloadLink') as HTMLLinkElement
// ---------------------------------
// listen to messages
// eslint-disable-next-line
onmessage = (event: Event) => {
  // capture message
  // @ts-ignore
  const message = event.data.pluginMessage
  // export json file
  if (message.command === 'export') {
    // download
    downloadJson(parent, downloadLink, message.data.filename, message.data.data)
  }
  // send to url
  if (message.command === 'urlExport') {
    // only run of a valid url is provided
    if (message.data.url === '') {
      window.parent.postMessage({
        pluginMessage: {
          command: 'closePlugin',
          notification: '🚨 No server url was provided, push aborted!'
        }
      }, '*')
    } else {
      urlExport(message.data)
    }
  }
  // when settings date is send to ui
  if (message.command === 'getSettings') {
    // fill form with data
    setFormSettings(settingsForm, message.settings, message.accessToken)
    // show update notice
    if (message.versionDifference === 'major' || message.versionDifference === 'minor') {
      versionNotice.classList.remove('hidden')
    }
  }
  // open help page
  if (message.command === 'help') {
    window.open('https://github.com/lukasoppermann/design-tokens')
    parent.postMessage({
      pluginMessage: {
        command: 'closePlugin'
      }
    }, '*')
  }
}
// ---------------------------------
// when save button is clicked
saveButton.addEventListener('click', () => {
  // if form is valid
  if (settingsForm.checkValidity() === true) {
    // get values from form
    const { settings, accessToken } = getFormSettings(settingsForm)
    // sent to index saveSettings method
    figmaUIApi.postMessage({
      pluginMessage: {
        command: 'saveSettings',
        settings: settings,
        accessToken: accessToken
      }
    // @ts-ignore
    }, '*')
  }
})
// ---------------------------------
// CANCEL: close settings without saving
cancelButton.addEventListener('click', () => {
  figmaUIApi.postMessage({
    pluginMessage: {
      command: 'closePlugin'
    }
  // @ts-ignore
  }, '*')
})
// ---------------------------------
// set focus to first input of form
// @ts-ignore
settingsForm.querySelector('input[type=text]').focus()


declare function require(path: string): any

class App extends React.Component {
  textbox: HTMLInputElement

  countRef = (element: HTMLInputElement) => {
    if (element) element.value = '5'
    this.textbox = element
  }

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return <div>
      <form id="settingsForm" className="plugin-ui-content">
        <div id="versionNotice" className="notification notification--info hidden">
          <div className="notification--icon">🎉</div>
          <div className="notification--message">
            The <a className="subtle" href="https://www.figma.com/community/plugin/888356646278934516/Design-Tokens" target="_blank">Design Token plugin</a> was
            updated.<br />
            Find out about changes & new features in the <a href="https://github.com/lukasoppermann/design-tokens/releases" target="_blank">release notes →</a>
          </div>
        </div>
        <h3>Design Token Settings</h3>
        <div className="input flex-horizontal">
          <div className="label">Filename:</div>
          <input required pattern="^[\w\-\.\+@]+$" type="text" id="filename" className="input__field with-inside-label-behind-sm" placeholder="design-tokens" value="design-tokens" />
          <div className="label inside-label-behind--sm">.json</div>
        </div>
        <div className="flex-horizontal">
          <div className="label" style="width: 130px !important">Name conversion:</div>
          <select id="nameConversion" className="select-css">
            <option value="default">Default</option>
            <option value="camelCase">camelCase</option>
            <option value="kebabCase">kebab-case</option>
          </select>
        </div>
        <div className="section-title">Prefix</div>
        <div className="message-box">
          <div className="message message--info">Define a prefix for styles to be in-/excluded.</div>
        </div>
        <div className="flex-horizontal">
          <div className="input flex-horizontal">
            <div className="label">Prefix:</div>
            <input required pattern="\S+" type="text" id="prefix" className="input__field" placeholder="_" value="_" />
          </div>
          <div className="switch">
            <input className="switch__toggle" type="checkbox" id="excludePrefix" checked />
            <label className="switch__label" htmlFor="excludePrefix">Exclude<span className="toggleText"></span></label>
          </div>
        </div>
        <div className="section-title">Push to server</div>
        <div className="input flex-horizontal">
          <div className="label" style="width: 110px !important">Event type:</div>
          <input required pattern="^[\w\-\.\+@]+$" type="text" id="eventType" className="input__field" placeholder="update-tokens" value="update-tokens" />
          <div className="label label--info">"event_type" property in post request</div>
        </div>
        <div className="input flex-horizontal">
          <div className="label" style="width: 110px !important">Server url:</div>
          <input type="text" pattern="^https://.*" id="serverUrl" className="input__field" placeholder="https://api.github.com/repos/:username/:repo/dispatches" />
        </div>
        <div className="input flex-horizontal">
          <div className="label" style="width: 110px !important">Accept header:</div>
          <input type="text" pattern="\S+" id="acceptHeader" className="input__field" placeholder="accept header" value='application/vnd.github.everest-preview+json' />
        </div>
        <div className="flex-horizontal">
          <div className="label" style="width: 110px !important">Auth type:</div>
          <select id="authType" className="select-css">
            <option value="token">(Github) token</option>
            <option value="Basic">Basic authentication</option>
            <option value="Bearer">Bearer token authentication</option>
          </select>
        </div>
        <div className="input flex-horizontal">
          <div className="label" style="width: 110px !important">Access token:</div>
          <input type="text" pattern="\S+" id="accessToken" className="input__field" placeholder="your access token" />
        </div>
        <footer>
          <button id="cancelButton" className='button button--secondary' type="reset">Cancel</button>
          <button id="saveButton" className='button button--primary' type="submit">Save changes</button>
        </footer>
      </form>

      <a id="downloadLink"></a>
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))