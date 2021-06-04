import * as React from 'react'
import { useContext } from 'react';
import { Button } from "react-figma-plugin-ds"
import { FigmaContext } from '../context/FigmaContext';


const CancelButton = () => {

  const figmaUIApi = useContext(FigmaContext)

  const closePlugin = () => {
    figmaUIApi.postMessage({
      pluginMessage: {
        command: 'closePlugin'
      }
    // @ts-ignore
    }, '*')
  }
  
  return <Button isSecondary onClick={closePlugin}>Cancel</Button>
}
export { CancelButton }