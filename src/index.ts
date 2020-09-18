// imports
import exportTokens from './exportTokens'
// register the UI 
// by default it is hidden
figma.showUI(__html__, {visible: false})

// figma.command is the menu item executed from the plugin menu
// run different functions depending on the provided command
//
// EXPORT
// exports the design tokens
if(figma.command === 'export') {
  exportTokens()
  // always run closePlugin otherwise the plugin will keep running
  figma.closePlugin()
}
// SETTINGS
// settings for the design tokens
if(figma.command === 'settings') {
  figma.ui.show()
}
