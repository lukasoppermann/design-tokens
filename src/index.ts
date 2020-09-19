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
console.log("Figma plugin command:" + figma.command)
if(figma.command === 'export') {
  console.log("Running export")
  exportTokens()
  // const tokens = exportTokens()
  // console.log(tokens)
  // writeJson(tokens)
  // always run closePlugin otherwise the plugin will keep running
}
// SETTINGS
// settings for the design tokens
if(figma.command === 'settings') {
  const isTokenFrame = node => node.type === "FRAME" && node.name.trim().toLowerCase().substr(0,7) === '_tokens'
  const frames = figma.root.children.map(page => page.findChildren(node => isTokenFrame(node))).reduce((flatten, arr) => [...flatten, ...arr])
  console.log(frames.map(frame => frame.children))
  figma.ui.show()
}


figma.ui.onmessage = (message) => {
  console.log(message)
  if(message === 'closePlugin') {
    console.log('closing plugin')
    figma.closePlugin()
  }
}