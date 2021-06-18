import * as React from 'react'
import * as ReactDOM from 'react-dom'

/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
// import { setFormSettings } from './modules/settings'
import { urlExport } from './modules/urlExport'
import { SettingsForm } from './components/SettingsForm'
import { useEffect } from 'react'
import { FigmaContext } from './context/FigmaContext'
import { SettingsContext, settingsReducer, initialState as initialSettings } from './context/SettingsContext'
import { useImmerReducer } from 'use-immer'
import config from '../utilities/config'
// ---------------------------------
// @ts-ignore
const figmaUIApi: UIAPI = parent as UIAPI

const PluginUi = () => {
  const [state, dispatch] = useImmerReducer(settingsReducer, initialSettings)

  useEffect(() => {
    // ---------------------------------
    // listen to messages
    // eslint-disable-next-line
    onmessage = (event: Event) => {
      // capture message
      // @ts-ignore
      const message = event.data.pluginMessage
      // export json file
      if (message.command === 'export') {
        // download
        downloadJson(parent, document.getElementById('downloadLink') as HTMLLinkElement, message.data.filename, message.data.data)
      }
      // send to url
      if (message.command === config.commands.urlExport) {
        // only run of a valid url is provided
        if (message.data.url === '') {
          window.parent.postMessage({
            pluginMessage: {
              command: config.commands.closePlugin,
              notification: '🚨 No server url was provided, push aborted!'
            }
          }, '*')
        } else {
          urlExport(message.data)
        }
      }
      // when settings date is send to ui
      if (message.command === 'getSettings') {
        // fill form with data
        dispatch({
          type: 'load',
          payload: {
            ...message.settings,
            ...{ accessToken: message.accessToken },
            ...{ versionDifference: message.versionDifference }
          }
        })
        // setFormSettings(settingsForm, message.settings, message.accessToken)
        // show update notice
        // if (message.versionDifference === 'major' || message.versionDifference === 'minor') {
        //   versionNotice.classList.remove('hidden')
        // }
      }
      // open help page
      if (message.command === config.commands.help) {
        window.open('https://github.com/lukasoppermann/design-tokens')
        parent.postMessage({
          pluginMessage: {
            command: config.commands.closePlugin
          }
        }, '*')
      }
    }
  }, [])

  return (
    <FigmaContext.Provider value={figmaUIApi}>
      <SettingsContext.Provider value={{ state, dispatch }}>
        <SettingsForm />
        <a id='downloadLink' />
      </SettingsContext.Provider>
    </FigmaContext.Provider>
  )
}

ReactDOM.render(<PluginUi />, document.getElementById('pluginUI'))
