export type PluginCommands =
  'generalSettings' |
  'exportSettings' |
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
