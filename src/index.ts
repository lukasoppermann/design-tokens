import getTokenJson from './utilities/getTokenJson'
import buildFigmaData from './utilities/buildFigmaData'
import { getSettings, setSettings } from './utilities/settings'
import { getAccessToken, setAccessToken } from './utilities/accessToken'
import currentVersion from './utilities/version'
import semVerDifference from './utilities/semVerDifference'

// set plugin id if it does not exist
if (figma.root.getPluginData('fileId') === '') {
  figma.root.setPluginData('fileId', figma.root.name + ' ' + Math.floor(Math.random() * 1000000000))
}
const fileId = figma.root.getPluginData('fileId')
// Get the user settings
const userSettings = getSettings()
/**
 * @name activateUtilitiesUi
 * @description activates the utilities ui to run utility functions
 */
const activateUtilitiesUi = () => {
  // register the utilities UI (hidden by default)
  figma.showUI(__uiFiles__.utilities, { visible: false })
}
/**
 * @name getJson
 * @param {PluginAPI} figma
 * @param {boolean} stringify
 */
const getJson = (figma: PluginAPI, stringify: boolean = true) => {
  // construct figma data object
  const figmaData = buildFigmaData(figma, {
    prefix: userSettings.prefix,
    excludePrefix: userSettings.excludePrefix
  })
  if (stringify === false) {
    return getTokenJson(figmaData)
  }
  // get tokens as stringified json
  return JSON.stringify(getTokenJson(figmaData))
}
// ---------------------------------
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
  // activete utilities UI
  activateUtilitiesUi()
  // write tokens to json file
  figma.ui.postMessage({
    command: 'export',
    data: {
      filename: `${userSettings.filename}.json`,
      data: getJson(figma)
    }
  })
}
// SEND TO URL
// send tokens to url
if (figma.command === 'urlExport') {
  // activete utilities UI
  activateUtilitiesUi()
  // needed for getAccessToken async
  const urlExport = async () => {
    figma.ui.postMessage({
      command: 'urlExport',
      data: {
        url: userSettings.serverUrl,
        accessToken: await getAccessToken(fileId),
        authType: userSettings.authType,
        data: {
          event_type: userSettings.eventType,
          client_payload: {
            tokenFileName: `${userSettings.filename}.json`,
            tokens: `${getJson(figma, true)}`,
            filename: figma.root.name
          }
        }
      }
    })
  }
  // run export url function
  urlExport()
}
// ---------------------------------
// SETTINGS
// settings for the design tokens
if (figma.command === 'settings') {
  const lastVersionSettingsOpenedKey = 'lastVersionSettingsOpened'
  // height for the settings dialog
  let settingsDialogHeight = 565
  // wrap in function because of async client Storage
  const openUi = async () => {
    // get version & version difference
    const lastVersionSettingsOpened = await figma.clientStorage.getAsync(lastVersionSettingsOpenedKey)
    const versionDifference = semVerDifference(currentVersion, lastVersionSettingsOpened)
    // update version
    if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== currentVersion) {
      await figma.clientStorage.setAsync(lastVersionSettingsOpenedKey, currentVersion)
    }
    // if minor or major update
    if (versionDifference === 'major' || versionDifference === 'minor') {
      settingsDialogHeight += 60
    }
    // register the settings UI
    // by default it is hidden
    // @ts-ignore
    figma.showUI(__uiFiles__.settings, {
      visible: false,
      width: 550,
      height: settingsDialogHeight
    })
    // sent settings to UI
    figma.ui.postMessage({
      command: 'getSettings',
      settings: userSettings,
      accessToken: await getAccessToken(fileId),
      versionDifference: versionDifference
    })
    // @ts-ignore
    figma.ui.show(__uiFiles__.settings)
  }
  // run function
  openUi()
}
// HELP
// Open github help page
if (figma.command === 'help') {
  activateUtilitiesUi()
  figma.ui.postMessage({
    command: 'help'
  })
}

// CLOSE PLUGIN
figma.ui.onmessage = async (message) => {
  if (message.command === 'closePlugin') {
    // show notification if send
    if (message.notification !== undefined && message.notification !== '') {
      figma.notify(message.notification)
    }
    // close plugin
    // console.log('Figma Plugin does not close')
    figma.closePlugin()
  }
  // save settings
  if (message.command === 'saveSettings') {
    // store settings
    setSettings(message.settings)
    // accessToken
    await setAccessToken(fileId, message.accessToken)
    // close plugin
    figma.closePlugin()
  }
}
