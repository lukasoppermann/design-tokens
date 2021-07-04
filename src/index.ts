import { getSettings, setSettings } from './utilities/settings'
import { getAccessToken, setAccessToken } from './utilities/accessToken'
import { Settings as UserSettings } from '@typings/settings'
import config from '@config/config'
import { commands, PluginCommands } from '@config/commands'
import getVersionDifference from './utilities/getVersionDifference'
import getFileId from './utilities/getFileId'
import { PluginMessage } from '../types/pluginEvent'
import { exportRawTokenArray } from './utilities/getTokenJson'
import { stringifyJson } from './utilities/stringifyJson'

// initiate UI
figma.showUI(__html__, {
  visible: false,
  width: config.settingsDialog.width,
  height: config.settingsDialog.height
})
// Get the user settings
const userSettings: UserSettings = getSettings()
// ---------------------------------
// open UI
if ([commands.export, commands.urlExport, commands.generalSettings].includes(figma.command as PluginCommands)) {
  // wrap in function because of async client Storage
  const openUi = async () => {
    // get the current version differences to the last time the plugin was opened
    const versionDifference = await getVersionDifference(figma)
    // resize UI if needed
    if (versionDifference !== undefined && versionDifference !== 'patch') {
      figma.ui.resize(config.settingsDialog.width, config.settingsDialog.height + 60)
    }
    // write tokens to json file
    figma.ui.postMessage({
      command: figma.command as PluginCommands,
      payload: {
        settings: {
          ...userSettings,
          ...{ accessToken: await getAccessToken(getFileId(figma)) }
        },
        data: stringifyJson(exportRawTokenArray(figma, userSettings)),
        versionDifference: versionDifference,
        metadata: {
          filename: figma.root.name
        }
      }
    } as PluginMessage)
    // register the settings UI
    figma.ui.show()
  }
  // run function
  openUi()
}
/**
 * Open Help
 * Open github help page
 */
if (figma.command === commands.help) {
  figma.ui.postMessage({
    command: commands.help
  } as PluginMessage)
}

/**
 * React to messages
 */
figma.ui.onmessage = async (message: PluginMessage) => {
  const { command, payload } = message
  /**
   * on closePlugin
   * close plugin and show notification if available
   */
  if (command === commands.closePlugin) {
    // show notification if send
    if (payload?.notification !== undefined && payload?.notification !== '') {
      figma.notify(payload.notification)
    }
    // close plugin
    figma.ui.hide()
    figma.closePlugin()
  }
  /**
   * on saveSettings
   * save settings, access token and close plugin
   */
  if (command === commands.saveSettings) {
    // store settings
    setSettings(payload.settings)
    // accessToken
    await setAccessToken(getFileId(figma), payload.accessToken)
    // close plugin
    if (payload.closePlugin && payload.closePlugin === true) {
      figma.closePlugin()
    }
  }
}
