/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
import { setFormSettings, getFormSettings } from './modules/settings'
import { urlExport } from './modules/urlExport'
// ---------------------------------
const figmaUIApi: UIAPI = parent as UIAPI
// elements
const settingsForm: HTMLFormElement = document.getElementById('settingsForm') as HTMLFormElement
const saveButton: HTMLButtonElement = document.getElementById('saveButton') as HTMLButtonElement
const cancelButton: HTMLButtonElement = document.getElementById('cancelButton') as HTMLButtonElement
const versionNotice: HTMLDivElement = document.getElementById('versionNotice')
// download link
const downloadLink: HTMLLinkElement = document.getElementById('downloadLink') as HTMLLinkElement
// ---------------------------------
// listen to messages
// eslint-disable-next-line
onmessage = (event: Event) => {
  // capture message
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
  }, '*')
})
// ---------------------------------
// set focus to first input of form
settingsForm.querySelector('input[type=text]').focus()
