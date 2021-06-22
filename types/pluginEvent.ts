import { PluginCommands } from '../src/config/commands'

export type PluginMessage = {
  command: PluginCommands
  payload?: any
}

export type PluginEvent = {
  data: {
    pluginMessage: PluginMessage
  }
}
