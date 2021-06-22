export type PluginCommands = 'generalSettings' |
  'export' |
  'sendSettings' |
  'saveSettings' |
  'help' |
  'urlExport' |
  'closePlugin'

export const commands = {
  generalSettings: 'generalSettings' as PluginCommands,
  export: 'export' as PluginCommands,
  sendSettings: 'sendSettings' as PluginCommands,
  urlExport: 'urlExport' as PluginCommands,
  help: 'help' as PluginCommands,
  saveSettings: 'saveSettings' as PluginCommands,
  closePlugin: 'closePlugin' as PluginCommands
}
