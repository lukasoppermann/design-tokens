import * as React from 'react'
import { useContext } from 'react'
import { Button } from 'react-figma-plugin-ds'
import { commands } from '@config/commands'
import { FigmaContext } from '@ui/context'

const CancelButton = () => {
  const { figmaUIApi } = useContext(FigmaContext)

  const closePlugin = () => {
    // close the plugin
    figmaUIApi.postMessage({
      pluginMessage: {
        command: commands.closePlugin
      }
    // @ts-ignore
    }, '*')
  }

  return <Button isSecondary type='reset' onClick={closePlugin}>Cancel</Button>
}
export { CancelButton }
