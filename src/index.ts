import exportTokens from './exportTokens'
import buildFigmaData from './utilities/buildFigmaData'
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
  // @ts-ignore
  figma.ui.show(__uiFiles__.settings)
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
figma.ui.onmessage = (message) => {
  if (message.command === 'closePlugin') {
    figma.closePlugin()
  }
}