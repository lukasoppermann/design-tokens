import * as React from 'react'
import * as ReactDOM from 'react-dom'

/* eslint-env browser */
// @ts-nocheck
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import downloadJson from './modules/downloadJson'
import { urlExport } from './modules/urlExport'
import { GeneralSettings } from './components/GeneralSettings'
import { useEffect, useState } from 'react'
import { FigmaContext, SettingsContext } from './context'
import { useImmer } from 'use-immer'
import config from '../utilities/config'
import { VersionNotice } from './components/VersionNotice'
import { css } from '@emotion/css'
import { defaultSettings } from '../config/defaultSettings'
// ---------------------------------
// @ts-ignore
const figmaUIApi: UIAPI = parent as UIAPI

const style = css`
  padding: 8px var(--size-xxsmall) 0;
  margin-bottom: 0;
`

const PluginUi = () => {
  const [versionDifference, setVersionDifference] = useState(null)
  const [settings, updateSettings] = useImmer(defaultSettings)

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
        // load data
        updateSettings({
          ...message.settings,
          ...{ accessToken: message.accessToken }
        })
        // load version difference
        setVersionDifference(message.versionDifference)
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
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <main className={style}>
          <VersionNotice versionDifference={versionDifference} />
          <GeneralSettings />
          <a id='downloadLink' />
        </main>
      </SettingsContext.Provider>
    </FigmaContext.Provider>
  )
}

ReactDOM.render(<PluginUi />, document.getElementById('pluginUI'))
