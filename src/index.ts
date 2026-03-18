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
import getLaunchCommand from '@utils/getLaunchCommand'

const launchCommand = getLaunchCommand(figma)

const openExternalUrl = (url?: string) => {
  if (typeof url !== 'string' || url.trim() === '') {
    return
  }
  figma.openExternal(url)
  figma.closePlugin()
}

// initiate UI
figma.showUI(__html__, {
  themeColors: true,
  visible: false
})
console.log('[Design Tokens] Plugin initialized', {
  command: figma.command,
  launchCommand,
  editorType: figma.editorType,
  mode: figma.mode,
  vscode: Boolean(figma.vscode)
})
// ---------------------------------
// open UI
if (
  [commands.export, commands.urlExport, commands.generalSettings].includes(
    launchCommand as PluginCommands
  )
) {
  // wrap in function because of async client Storage
  const openUi = async () => {
    console.log('[Design Tokens] Opening UI', {
      command: launchCommand,
      originalCommand: figma.command
    })
    // Get the user settings
    const userSettings: UserSettings = getSettings()
    // get the current version differences to the last time the plugin was opened
    const versionDifference = await getVersionDifference(figma)
    // resize UI if needed
    figma.ui.resize(
      config.ui[launchCommand].width,
      config.ui[launchCommand].height
    )
    if (versionDifference !== undefined && versionDifference !== 'patch') {
      figma.ui.resize(
        config.ui[launchCommand].width,
        config.ui[launchCommand].height + 60
      )
    }
    const postMessageObject = {
      command: launchCommand,
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
        launchCommand
      )
    ) {
      console.log('[Design Tokens] Preparing raw token payload for UI', {
        command: launchCommand
      })
      postMessageObject.payload.data = stringifyJson(
        await exportRawTokenArray(figma, userSettings)
      )
      console.log('[Design Tokens] Raw token payload ready', {
        dataLength: postMessageObject.payload.data.length
      })
    }
    console.log('[Design Tokens] Posting initial UI message', {
      command: postMessageObject.command
    })
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
  openExternalUrl('https://github.com/lukasoppermann/design-tokens')
}
/**
 * Open demo
 */
if (figma.command === commands.demo) {
  openExternalUrl('https://www.figma.com/file/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma?node-id=231%3A2')
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
  if (command === undefined) {
    console.warn('[Design Tokens] Plugin received malformed UI message', {
      hasPayload: Boolean(payload),
      payloadKeys: payload ? Object.keys(payload) : []
    })
    return
  }
  console.log('[Design Tokens] Plugin received UI message', {
    command,
    hasPayload: Boolean(payload),
    payloadKeys: payload ? Object.keys(payload) : []
  })
  /**
   * on closePlugin
   * close plugin and show notification if available
   */
  if (command === commands.closePlugin) {
    console.log('[Design Tokens] Closing plugin', {
      notification: payload?.notification || null
    })
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
    console.log('[Design Tokens] Saving settings', {
      closePlugin: payload?.closePlugin === true
    })
    // store settings
    setSettings(payload.settings)
    // accessToken
    await setAccessToken(getFileId(figma), payload.accessToken)
    // close plugin
    if (payload.closePlugin && payload.closePlugin === true) {
      figma.closePlugin()
    }
  }

  if (command === commands.openUrl) {
    openExternalUrl(payload?.url)
  }
}
