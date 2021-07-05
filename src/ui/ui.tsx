import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'figma-plugin-ds/dist/figma-plugin-ds.css'
import './css/variables.css'
import './css/ui.css'
import { GeneralSettings } from '@components/GeneralSettings'
import { useState } from 'react'
import { FigmaContext, SettingsContext, TokenContext } from '@ui/context'
import { useImmer } from 'use-immer'
import { VersionNotice } from '@components/VersionNotice'
import { css } from '@emotion/css'
import { defaultSettings } from '@config/defaultSettings'
import { closeOnEsc } from './modules/closeOnEsc'
import { commands, PluginCommands } from '@config/commands'
import { PluginEvent } from '@typings/pluginEvent'
import { FileExportSettings } from '@components/FileExportSettings'
import { UrlExportSettings } from '@components/UrlExportSettings'
// ---------------------------------
// @ts-ignore
const figmaUIApi: UIAPI = parent as UIAPI

const style = css`
  padding: 8px var(--size-xxsmall) 0;
  margin-bottom: 0;
`

const PluginUi = () => {
  const [versionDifference, setVersionDifference] = useState(null)
  const [activePage, setActivePage] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [figmaMetaData, setFigmaMetaData] = useState(null)
  const [settings, updateSettings] = useImmer(defaultSettings)

  // listen to messages
  // eslint-disable-next-line
  onmessage = (event: PluginEvent) => {
    // capture message
    const { command, payload } = event.data.pluginMessage as {command: PluginCommands, payload: any}
    // set settings
    if ([commands.urlExport, commands.export, commands.generalSettings].includes(command)) {
      console.log('payload.settings', payload.settings)

      updateSettings(payload.settings)
      setVersionDifference(payload.versionDifference)
      setFigmaMetaData(payload.metadata)
      setTokens(payload.data)
      // activate page
      setActivePage(command)
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
    <FigmaContext.Provider value={{ figmaUIApi, figmaMetaData }}>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <TokenContext.Provider value={{ tokens, setTokens }}>
          <main className={style} onKeyDown={e => closeOnEsc(e, figmaUIApi)}>
            <VersionNotice versionDifference={versionDifference} />
            {activePage === commands.generalSettings && <GeneralSettings />}
            {activePage === commands.export && <FileExportSettings />}
            {activePage === commands.urlExport && <UrlExportSettings />}
          </main>
        </TokenContext.Provider>
      </SettingsContext.Provider>
    </FigmaContext.Provider>
  )
}

ReactDOM.render(<PluginUi />, document.getElementById('pluginUI'))
