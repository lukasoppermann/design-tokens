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
import { VersionNotice } from '@components/VersionNotice'
import { css } from '@emotion/css'
import { defaultSettings } from '@config/defaultSettings'
import { closeOnEsc } from './modules/closeOnEsc'
import { commands, PluginCommands } from '@config/commands'
import { PluginEvent } from '@typings/pluginEvent'
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
  onmessage = (event: PluginEvent) => {
    // capture message
    // @ts-ignore
    const { command, payload } = event.data.pluginMessage as {command: PluginCommands, payload: any}
    // export json file
    if (command === commands.export) {
      // load data
      updateSettings(payload.settings)
      setTokens(payload.data)
      // download
      downloadJson(parent, downloadLinkRef.current as HTMLLinkElement, payload.data)
    }
    // send to url
    if (command === commands.urlExport) {
      urlExport(payload)
    }
    // when settings date is send to ui
    // @ts-ignore
    if (command === 'getSettings') {
      // load data
      updateSettings({
        ...payload.settings,
        ...{ accessToken: payload.accessToken }
      })
      // load version difference
      setVersionDifference(payload.versionDifference)
    }
    // open help page
    if (command === commands.help) {
      window.open('https://github.com/lukasoppermann/design-tokens')
      parent.postMessage({
        pluginMessage: {
          command: commands.closePlugin
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
