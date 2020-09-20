// imports
import exportTokens from './exportTokens'
// register the UI 
// by default it is hidden
figma.showUI(__html__, {visible: false})
// const ui = {
//   settings: figma.showUI(__uiFiles__.settings, {visible: false}),
//   utilities: figma.showUI(__uiFiles__.utilities, {visible: false})
// }

// figma.command is the menu item executed from the plugin menu
// run different functions depending on the provided command
//
// EXPORT
// exports the design tokens
if(figma.command === 'export') {
  exportTokens()
  // const tokens = exportTokens()
  // writeJson(tokens)
  // always run closePlugin otherwise the plugin will keep running
}
// SETTINGS
// settings for the design tokens
if(figma.command === 'settings') {
  const isTokenFrame = node => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0,7) === '_tokens'
  const frames = figma.root.children.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])
  figma.ui.show()
}


figma.ui.onmessage = (message) => {
  if(message === 'closePlugin') {
    // figma.closePlugin()
  }
}