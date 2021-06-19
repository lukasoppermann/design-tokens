export type PluginCommands = 'generalSettings' |
  'export' |
  'sendSettings' |
  'saveSettings' |
  'help' |
  'urlExport' |
  'closePlugin'

export type PluginMessage = {
  command: PluginCommands
  payload?: any
}

export type PluginEvent = {
  data: {
    pluginMessage: PluginMessage
  }
}
