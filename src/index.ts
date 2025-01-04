import { getSettings, resetSettings, setSettings } from '@utils/settings'
import { getAccessToken, setAccessToken } from '@utils/accessToken'
import { Settings as UserSettings } from '@typings/settings'
import config from '@config/config'
import { commands, PluginCommands } from '@config/commands'
import getVersionDifference from '@utils/getVersionDifference'
import getFileId from '@utils/getFileId'
import { PluginMessage } from '@typings/pluginEvent'
import { exportRawTokenArray } from '@utils/getTokenJson'
import { stringifyJson } from '@utils/stringifyJson'

// initiate UI
figma.showUI(__html__, {
  themeColors: true,
  visible: false
})
// ---------------------------------
// open UI
if (
  [commands.export, commands.urlExport, commands.generalSettings].includes(
    figma.command as PluginCommands
  )
) {
  // wrap in function because of async client Storage
  const openUi = async () => {
    // Get the user settings
    const userSettings: UserSettings = getSettings()
    // get the current version differences to the last time the plugin was opened
    const versionDifference = await getVersionDifference(figma)
    // resize UI if needed
    figma.ui.resize(
      config.ui[figma.command].width,
      config.ui[figma.command].height
    )
    if (versionDifference !== undefined && versionDifference !== 'patch') {
      figma.ui.resize(
        config.ui[figma.command].width,
        config.ui[figma.command].height + 60
      )
    }
    const postMessageObject = {
      command: figma.command as PluginCommands,
      payload: {
        settings: {
          ...userSettings,
          ...{ accessToken: await getAccessToken(getFileId(figma)) }
        },
        data: null,
        versionDifference: versionDifference,
        metadata: {
          filename: figma.root.name
        }
      }
    }

    if (
      [commands.export, commands.urlExport].includes(
        figma.command as PluginCommands
      )
    ) {
      postMessageObject.payload.data = stringifyJson(
        await exportRawTokenArray(figma, userSettings)
      )
    }
    figma.ui.postMessage({ ...postMessageObject })
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
    command: commands.help,
    payload: {
      url: 'https://github.com/lukasoppermann/design-tokens'
    }
  } as PluginMessage)
}
/**
 * Open demo
 */
if (figma.command === commands.demo) {
  figma.ui.postMessage({
    command: commands.demo,
    payload: {
      url: 'https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2'
    }
  } as PluginMessage)
}
/**
 * Reset settings
 */
if (figma.command === commands.reset) {
  resetSettings()
  // send message
  figma.notify('⚙️ Settings have been reset.')
  figma.closePlugin()
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
