import { getSettings, setSettings } from './utilities/settings'
import { getAccessToken, setAccessToken } from './utilities/accessToken'
import { urlExportData } from '../types/urlExportData'
import getJson from './utilities/getJson'
import { Settings as UserSettings } from '../types/settings'
import config from './utilities/config'
import getVersionDifference from './utilities/getVersionDifference'
import getFileId from './utilities/getFileId'

// initiate UI
figma.showUI(__html__, {
  visible: false,
  width: config.settingsDialog.width,
  height: config.settingsDialog.height
})
// Get the user settings
const userSettings: UserSettings = getSettings()
// ---------------------------------
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
  // write tokens to json file
  figma.ui.postMessage({
    command: 'export',
    data: {
      filename: `${userSettings.filename}.json`,
      data: getJson(figma, userSettings)
    }
  })
}
// SEND TO URL
// send tokens to url
if (figma.command === 'urlExport') {
  // needed for getAccessToken async
  const urlExport = async () => {
    figma.ui.postMessage({
      command: 'urlExport',
      data: {
        url: userSettings.serverUrl,
        accessToken: await getAccessToken(getFileId(figma)),
        acceptHeader: userSettings.acceptHeader,
        authType: userSettings.authType,
        data: {
          event_type: userSettings.eventType,
          client_payload: {
            tokenFileName: `${userSettings.filename}.json`,
            tokens: `${getJson(figma, userSettings, true)}`,
            filename: figma.root.name
          }
        }
      } as urlExportData
    })
  }
  // run export url function
  urlExport()
}
// ---------------------------------
// SETTINGS
// settings for the design tokens
if (figma.command === 'settings') {
  // wrap in function because of async client Storage
  const openUi = async () => {
    // get the current version differences to the last time the plugin was opened
    const versionDifference = await getVersionDifference(figma)
    // resize UI if needed
    if (versionDifference !== undefined && versionDifference !== 'patch') {
      figma.ui.resize(config.settingsDialog.width, config.settingsDialog.height + 60)
    }
    // register the settings UI
    figma.ui.show()
    // sent settings to UI
    figma.ui.postMessage({
      command: 'getSettings',
      settings: userSettings,
      accessToken: await getAccessToken(getFileId(figma)),
      versionDifference: versionDifference
    })
    // @ts-ignore
    figma.ui.show()
  }
  // run function
  openUi()
}
/**
 * Open Help
 * Open github help page
 */
if (figma.command === 'help') {
  figma.ui.postMessage({
    command: 'help'
  })
}

/**
 * React to messages
 */
figma.ui.onmessage = async (message) => {
  /**
   * on closePlugin
   * close plugin and show notification if available
   */
  if (message.command === 'closePlugin') {
    // show notification if send
    if (message.notification !== undefined && message.notification !== '') {
      figma.notify(message.notification)
    }
    // close plugin
    figma.ui.hide()
    figma.closePlugin()
  }
  /**
   * on saveSettings
   * save settings, access token and close plugin
   */
  if (message.command === 'saveSettings') {
    // store settings
    setSettings(message.settings)
    // accessToken
    await setAccessToken(getFileId(figma), message.accessToken)
    // close plugin
    figma.closePlugin()
  }
}
