/* istanbul ignore file */
export type PluginCommands = 'generalSettings' |
  'export' |
  'sendSettings' |
  'saveSettings' |
  'help' |
  'demo' |
  'openUrl' |
  'reset' |
  'urlExport' |
  'closePlugin'

export const commands = {
  generalSettings: 'generalSettings' as PluginCommands,
  export: 'export' as PluginCommands,
  sendSettings: 'sendSettings' as PluginCommands,
  urlExport: 'urlExport' as PluginCommands,
  help: 'help' as PluginCommands,
  demo: 'demo' as PluginCommands,
  openUrl: 'openUrl' as PluginCommands,
  reset: 'reset' as PluginCommands,
  saveSettings: 'saveSettings' as PluginCommands,
  closePlugin: 'closePlugin' as PluginCommands
}
