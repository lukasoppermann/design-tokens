import config from '@config/config'

export const closeOnEsc = (event, figmaUIApi) => {
  if (event.code === 'Escape') {
    figmaUIApi.postMessage({
      pluginMessage: {
        command: config.commands.closePlugin
      }
    // @ts-ignore
    }, '*')
  }
}
