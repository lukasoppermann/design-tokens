// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
// ---------------------------------
// elements
const settingsForm: HTMLFormElement = document.getElementById('settingsForm') as HTMLFormElement

// download link
const downloadLink: HTMLLinkElement = document.querySelector('[data-id="downloadLink"]')
// ---------------------------------
// listen to messages
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
    document.getElementById('filename').value = message.settings.filename
    document.getElementById('nameConversion').querySelector(`[value=${message.settings.nameConversion}]`).selected = true
    document.getElementById('prefix').value = message.settings.prefix
    document.getElementById('excludePrefix').checked = message.settings.excludePrefix
    document.getElementById('serverurl').value = message.settings.serverUrl
    document.getElementById('eventtype').value = message.settings.eventType
    document.getElementById('authType').querySelector(`[value=${message.settings.authType}]`).selected = true
    document.getElementById('accesstoken').value = message.accessToken
    // show update notice
    if (message.versionDifference === 'major' || message.versionDifference === 'minor') {
      document.getElementById('versionNotice').classList.remove('hidden')
    }
  }
}
// ---------------------------------
// when save button is clicked
document.getElementById('save').onclick = () => {
  // if form is valid
  if (settingsForm.checkValidity() === true) {
    // sent to index saveSettings method
    parent.postMessage({
      pluginMessage: {
        command: 'saveSettings',
        settings: {
          filename: document.getElementById('filename').value,
          nameConversion: document.getElementById('nameConversion').value,
          prefix: document.getElementById('prefix').value,
          excludePrefix: document.getElementById('excludePrefix').checked,
          serverUrl: document.getElementById('serverurl').value,
          eventType: document.getElementById('eventtype').value,
          authType: document.getElementById('authType').value
        },
        accessToken: document.getElementById('accesstoken').value
      }
    }, '*')
  }
}
// ---------------------------------
// close on esc
document.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    parent.postMessage({ pluginMessage: { command: 'closePlugin' } }, '*')
  }
})
// ---------------------------------
// CANCEL: close settings without saving
document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { command: 'closePlugin' } }, '*')
}

// set focus to first input of form
(<HTMLInputElement>settingsForm.querySelector('input[type=text]')).focus()
