import config from '@config/config'

export const globalKeyPressed = (event, figmaUIApi) => {
  if (['Escape'].includes(event.code)) {
    figmaUIApi.postMessage({
      pluginMessage: {
        command: config.commands.closePlugin
      }
    // @ts-ignore
    }, '*')
  }
}
