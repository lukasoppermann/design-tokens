import exportTokens from './exportTokens'
import buildFigmaData from './utilities/buildFigmaData'
import settingsPrepare from './utilities/settingsPrepare'
import { settingsKeys, getSettings, getPrivateSettings } from './utilities/settingsGetters'
import { UserSettings, PrivateUserSettings } from '../types/settings'

// Get the user settings
const getUserSettings = (userSettings: string): UserSettings | undefined => userSettings.length > 0 ? JSON.parse(userSettings) : undefined
const userSettings = getUserSettings(figma.root.getPluginData(settingsKeys.settings))

// get private user settings
const getPrivateUserSettings = async (): Promise<PrivateUserSettings> => await figma.clientStorage.getAsync(settingsKeys.privateSettings)


const saveSettings = (settings: UserSettings, secretSettings: PrivateUserSettings) => {
  // store public settings that should be shared across org
  figma.root.setPluginData('settings', JSON.stringify(settings, null, 2))
  // set secret server credentials
  figma.clientStorage.setAsync('secretSettings', secretSettings)
}

const activateUtilitiesUi = () => {
  // register the utilities UI (hidden by default)
  // @ts-ignore
  figma.showUI(__uiFiles__.utilities, { visible: false })
}
// figma.command is the menu item executed from the plugin menu
// run different functions depending on the provided command
//
// EXPORT
// exports the design tokens
if(figma.command === 'export') {
  activateUtilitiesUi()
  // construct figma data object
  // const figmaData = buildFigmaData(figma)
  const figmaData = buildFigmaData(figma, {
    prefix: userSettings.prefix,
    excludePrefix: userSettings.excludePrefix
  })
  // export tokens
  exportTokens(figmaData)
}
// SETTINGS
// settings for the design tokens
if(figma.command === 'settings') {
  // register the settings UI
  // by default it is hidden
  // @ts-ignore
  figma.showUI(__uiFiles__.settings, {
    visible: false,
    width: 500,
    height: 220
  })
  // wrap in function because of async client Storage
  const openUi = async () => {
    // get user provate settings
    const userPrivateSettings = await getPrivateUserSettings()
    // sent settings to UI
    figma.ui.postMessage({
      command: "getSettings",
      data: {
        settings: getSettings(userSettings),
        privateSettings: getPrivateSettings(userPrivateSettings)
      }
    })
    // @ts-ignore
    figma.ui.show(__uiFiles__.settings)
  }
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