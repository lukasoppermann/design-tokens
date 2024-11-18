import { commands } from '@config/commands'
import { PluginMessage } from '@typings/pluginEvent'

export const downloadJson = (parent, link: HTMLLinkElement, json: string) => {
  // if no tokens are present
  if (json === '[]') {
    parent.postMessage({
      pluginMessage: {
        // command: commands.closePlugin,
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
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    link.href = url;
    // Programmatically trigger a click on the anchor element
    link.click();
    URL.revokeObjectURL(url);
    // send success message
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '🎉 Design token export successful!'
        }
      } as PluginMessage
    }, '*')
  } catch (error) {
    // send success message
    parent.postMessage({
      pluginMessage: {
        // command: commands.closePlugin,
        payload: {
          notification: '⛔️ Design token failed!'
        }
      } as PluginMessage
    }, '*')
    // log error
    console.error('Export error: ', error)
  }
}
