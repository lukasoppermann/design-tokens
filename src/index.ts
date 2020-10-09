import getTokenJson from './getTokenJson'
import buildFigmaData from './utilities/buildFigmaData'
import settingsPrepare from './utilities/settingsPrepare'
import { settingsKeys, getSettings, getPrivateSettings } from './utilities/settingsGetters'
import { UserSettings, PrivateUserSettings } from '../types/settings'
import currentVersion from './utilities/version'
import semVerDifference from './utilities/semVerDifference'

// Get the user settings
const getUserSettings = (userSettings: string): UserSettings | undefined => userSettings.length > 0 ? JSON.parse(userSettings) : undefined
const userSettings = getSettings(getUserSettings(figma.root.getPluginData(settingsKeys.settings)))
// get private user settings
const getPrivateUserSettings = async (): Promise<PrivateUserSettings> => await figma.clientStorage.getAsync(settingsKeys.privateSettings)
/**
 * @name saveSettings
 * @description save the user settings and the private user settings to the "cache"
 * @param {UserSettings} settings
 * @param {PrivateUserSettings} secretSettings
 */
const saveSettings = (settings: UserSettings, secretSettings: PrivateUserSettings) => {
  // store public settings that should be shared across org
  figma.root.setPluginData('settings', JSON.stringify(settings, null, 2))
  // set secret server credentials
  figma.clientStorage.setAsync('secretSettings', secretSettings)
}
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
  return JSON.stringify(getTokenJson(figmaData), null, 2)
}
// ---------------------------------
// EXPORT TO FILE
// exports the design tokens to a file
if (figma.command === 'export') {
  // activete utilities UI
  activateUtilitiesUi()
  // write tokens to json file
  figma.ui.postMessage({
    command: "export",
    data: {
      filename: `${userSettings.filename}.json`,
      data: getJson(figma)
    }
  })
}
// ---------------------------------
// SETTINGS
// settings for the design tokens
if(figma.command === 'settings') {
  const lastVersionSettingsOpenedKey = 'lastVersionSettingsOpened'
  // height for the settings dialog
  let settingsDialogHeight = 270
  // wrap in function because of async client Storage
  const openUi = async () => {
    // get version & version difference
    const lastVersionSettingsOpened = await figma.clientStorage.getAsync(lastVersionSettingsOpenedKey)
    const versionDifference = semVerDifference(lastVersionSettingsOpened, currentVersion)
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
      width: 500,
      height: settingsDialogHeight
    })
    // get user provate settings
    const userPrivateSettings = await getPrivateUserSettings()
    // sent settings to UI
    figma.ui.postMessage({
      command: "getSettings",
      data: {
        settings: userSettings,
        privateSettings: getPrivateSettings(userPrivateSettings),
        versionDifference: versionDifference
      }
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
    command: "help"
  })
}

// CLOSE PLUGIN
figma.ui.onmessage = async (message) => {
  if (message.command === 'closePlugin') {
    figma.closePlugin()
  }
  // save settings
  if (message.command === 'saveSettings') {
    // construct currentSettings object
    const currentSettings = {
      [settingsKeys.settings]: userSettings,
      [settingsKeys.privateSettings]: await getPrivateUserSettings()
    }
    // prepare settings object
    const preparedSettings = settingsPrepare(message.data, currentSettings)
    // store settings 
    saveSettings(preparedSettings.settings, preparedSettings.privateSettings)
    // close plugin
    figma.closePlugin()
  }
}