import { PluginCommands } from '../../types/pluginEvent'
/* istanbul ignore file */
export default {
  settingsDialog: {
    width: 550,
    height: 595
  },
  key: {
    lastVersionSettingsOpened: 'lastVersionSettingsOpened',
    fileId: 'fileId'
  },
  commands: {
    generalSettings: 'generalSettings' as PluginCommands,
    exportSettings: 'exportSettings' as PluginCommands,
    sendSettings: 'sendSettings' as PluginCommands,
    urlExport: 'urlExport' as PluginCommands,
    help: 'help' as PluginCommands,
    saveSettings: 'saveSettings' as PluginCommands,
    closePlugin: 'closePlugin' as PluginCommands
  }
}
