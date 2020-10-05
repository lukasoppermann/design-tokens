import exportTokens from './exportTokens'
import buildFigmaData from './utilities/buildFigmaData'
import prepareSettings from './utilities/prepareSettings'

const getSettings = async () => {
  return {
    // store public settings that should be shared across org
    settings: JSON.parse(figma.root.getPluginData('settings')),
    // set secret server credentials
    secretSettings: await figma.clientStorage.getAsync('secretSettings')
  }
}

const saveSettings = (settings, secretSettings) => {
  // store public settings that should be shared across org
  figma.root.setPluginData('settings', JSON.stringify(settings, null, 2))
  // set secret server credentials
  figma.clientStorage.setAsync('secretSettings', secretSettings)
}

const activateUtilitiesUi = () => {
  // register the utilities UI 
  // by default it is hidden
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
  const figmaData = buildFigmaData(figma)
  // export tokens
  exportTokens(figmaData)
  // const tokens = exportTokens()
  // writeJson(tokens)
  // always run closePlugin otherwise the plugin will keep running
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
  const openUi = async () => {
    figma.ui.postMessage({
      command: "getSettings",
      data: await getSettings()
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
    const preparedSettings = prepareSettings(message.data, await getSettings())
    // store settings 
    saveSettings(preparedSettings.settings, preparedSettings.secretSettings)
    // close plugin
    figma.closePlugin()
  }
}