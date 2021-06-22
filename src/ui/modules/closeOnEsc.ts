import { commands } from '@config/commands'

export const closeOnEsc = (event, figmaUIApi) => {
  if (event.code === 'Escape') {
    figmaUIApi.postMessage({
      pluginMessage: {
        command: commands.closePlugin
      }
    // @ts-ignore
    }, '*')
  }
}
