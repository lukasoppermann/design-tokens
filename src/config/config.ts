import { PluginCommands } from '@typings/pluginEvent'
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
    export: 'export' as PluginCommands,
    sendSettings: 'sendSettings' as PluginCommands,
    urlExport: 'urlExport' as PluginCommands,
    help: 'help' as PluginCommands,
    saveSettings: 'saveSettings' as PluginCommands,
    closePlugin: 'closePlugin' as PluginCommands
  },
  exports: {
    color: {
      label: 'Colors & gradiets',
      key: 'color'
    },
    font: {
      label: 'Fonts',
      key: 'font'
    },
    effect: {
      label: 'Effects',
      key: 'effect'
    },
    grid: {
      label: 'Grids',
      key: 'grid'
    },
    border: {
      label: 'Borders',
      key: 'border'
    },
    breakpoint: {
      label: 'Breakpoints',
      key: 'breakpoint'
    },
    radius: {
      label: 'Radii',
      key: 'radius'
    },
    size: {
      label: 'Sizes',
      key: 'size'
    },
    spacing: {
      label: 'Spacing',
      key: 'spacing'
    },
    motion: {
      label: 'Motion',
      key: 'motion'
    }
  }
}
