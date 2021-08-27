import { commands } from '@config/commands'
import { PluginMessage } from '@typings/pluginEvent'

export const downloadJson = (parent, link: HTMLLinkElement, json: string) => {
  // if no tokens are present
  if (json === '[]') {
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '⛔️ No design token detected!'
        }
      } as PluginMessage
    }, '*')
    // abort
    return
  }
  // try to export tokens
  try {
    link.href = `data:application/design-tokens+json;charset=utf-8,${encodeURIComponent(json)}`
    // Programmatically trigger a click on the anchor element
    link.click()
    // send success messgae
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '🎉 Design token export succesfull!'
        }
      } as PluginMessage
    }, '*')
  } catch (error) {
    // send success messgae
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '⛔️ Design token failed!'
        }
      } as PluginMessage
    }, '*')
    // log error
    console.error('Export error: ', error)
  }
}
