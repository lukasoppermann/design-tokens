import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import { downloadJson } from '@ui/modules/downloadJson'
import { urlExport } from '@ui/modules/urlExport'
import { GeneralSettings } from '@components/GeneralSettings'
import { useRef, useState } from 'react'
import { FigmaContext, SettingsContext, TokenContext } from '@ui/context'
import { useImmer } from 'use-immer'
import config from '@config/config'
import { VersionNotice } from '@components/VersionNotice'
import { css } from '@emotion/css'
import { defaultSettings } from '@config/defaultSettings'
import { closeOnEsc } from './modules/closeOnEsc'
// ---------------------------------
// @ts-ignore
const figmaUIApi: UIAPI = parent as UIAPI

const style = css`
  padding: 8px var(--size-xxsmall) 0;
  margin-bottom: 0;
`

const PluginUi = () => {
  const [versionDifference, setVersionDifference] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [settings, updateSettings] = useImmer(defaultSettings)
  const downloadLinkRef = useRef()

  // listen to messages
  // eslint-disable-next-line
    onmessage = (event: Event) => {
    // capture message
    // @ts-ignore
    const message = event.data.pluginMessage
    // export json file
    if (message.command === 'export') {
      // load data
      updateSettings(message.data.settings)
      setTokens(message.data.data)
      // download
      downloadJson(parent, downloadLinkRef.current as HTMLLinkElement, message.data.data)
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

  return (
    <FigmaContext.Provider value={figmaUIApi}>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <TokenContext.Provider value={{ tokens, setTokens }}>
          <main className={style} onKeyDown={e => closeOnEsc(e, figmaUIApi)}>
            <VersionNotice versionDifference={versionDifference} />
            <GeneralSettings />
            <a
              ref={downloadLinkRef}
              download={`${settings.filename ?? 'design-tokens'}${settings.extension}`}
              title={`${settings.filename ?? 'design-tokens'}${settings.extension}`}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(tokens)}`}
            />
          </main>
        </TokenContext.Provider>
      </SettingsContext.Provider>
    </FigmaContext.Provider>
  )
}

ReactDOM.render(<PluginUi />, document.getElementById('pluginUI'))
