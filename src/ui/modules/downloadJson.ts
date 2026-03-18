import { commands } from '@config/commands'
import { PluginMessage } from '@typings/pluginEvent'

export const downloadJson = (parent, link: HTMLAnchorElement, json: string) => {
  console.log('[Design Tokens] downloadJson called', {
    jsonLength: JSON.parse(json).length,
    json: json,
    hasLink: Boolean(link),
    currentHref: link?.href || null
  })
  // if no tokens are present
  if (json === '[]') {
    console.warn('[Design Tokens] downloadJson aborted because json is an empty array')
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
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    console.log('[Design Tokens] Blob URL created', { url })
    link.href = url
    // Programmatically trigger a click on the anchor element
    console.log('[Design Tokens] Triggering anchor click for export')
    link.click()
    URL.revokeObjectURL(url)
    console.log('[Design Tokens] Blob URL revoked and success notification sent')
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
    console.error('[Design Tokens] downloadJson failed', error)
    // send success message
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '⛔️ Design token failed!'
        }
      } as PluginMessage
    }, '*')
  }
}
