/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
import { setFormSettings, getFormSettings } from './modules/settings'
// ---------------------------------
const figmaUIApi: UIAPI = parent as UIAPI
// elements
const settingsForm: HTMLFormElement = document.getElementById('settingsForm') as HTMLFormElement
const saveButton: HTMLButtonElement = document.getElementById('saveButton') as HTMLButtonElement
const cancelButton: HTMLButtonElement = document.getElementById('cancelButton') as HTMLButtonElement
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
  // when settings date is send to ui
  if (message.command === 'getSettings') {
    // fill form with data
    setFormSettings(settingsForm, message.settings, message.accessToken)
    // show update notice
    if (message.versionDifference === 'major' || message.versionDifference === 'minor') {
      document.getElementById('versionNotice').classList.remove('hidden')
    }
  }
}
// ---------------------------------
// when save button is clicked
saveButton.addEventListener('click', () => {
  // if form is valid
  if (settingsForm.checkValidity() === true) {
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
