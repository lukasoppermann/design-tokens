import * as React from 'react'
import { createRoot } from 'react-dom/client'
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
import { handleKeyboardInput } from './modules/handleKeyboardInput'
import { commands, PluginCommands } from '@config/commands'
import { PluginEvent, PluginMessage } from '@typings/pluginEvent'
import { FileExportSettings } from '@components/FileExportSettings'
import { UrlExportSettings } from '@components/UrlExportSettings'
// ---------------------------------
const figmaUIApi: UIAPI = parent as unknown as UIAPI

const style = css`
  padding: 8px var(--size-xxsmall) 0;
  margin-bottom: 0;
  form {
    margin-bottom: 0;
  }
`

const PluginUi = () => {
  const [versionDifference, setVersionDifference] = useState(null)
  const [activePage, setActivePage] = useState(null)
  const [tokens, setTokens] = useState(null)
  const [figmaMetaData, setFigmaMetaData] = useState(null)
  const [settings, updateSettings] = useImmer(defaultSettings)

  onmessage = (event: PluginEvent) => {
    // capture message
    const pluginMessage: Partial<PluginMessage> = event.data.pluginMessage || {}
    const { command, payload } = pluginMessage as {
      command?: PluginCommands
      payload?: PluginMessage['payload']
    }
    console.log('[Design Tokens] UI received plugin message', {
      command,
      hasPayload: Boolean(payload),
      payloadKeys: payload ? Object.keys(payload) : []
    })
    // set settings
    if ([commands.urlExport, commands.export, commands.generalSettings].includes(command)) {
      updateSettings({
        ...defaultSettings,
        ...payload.settings,
        prefix: {
          ...defaultSettings.prefix,
          ...payload.settings?.prefix
        },
        exports: {
          ...defaultSettings.exports,
          ...payload.settings?.exports
        },
        filename: payload.settings.filename || payload.metadata.filename
      })
      setVersionDifference(payload.versionDifference)
      setFigmaMetaData(payload.metadata)
      setTokens(payload.data)
      // activate page
      setActivePage(command)
      console.log('[Design Tokens] UI activated page', {
        command,
        hasData: Boolean(payload.data),
        dataLength: typeof payload.data === 'string' ? payload.data.length : null,
        data: payload.data
      })
    }
    // open url
    if ([commands.help, commands.demo, commands.openUrl].includes(command)) {
      console.log('[Design Tokens] UI opening external URL', { url: payload.url })
      parent.postMessage({
        pluginMessage: {
          command: commands.openUrl,
          payload: {
            url: payload.url
          }
        }
      }, '*')
    }
  }

  return (
    <FigmaContext.Provider value={{ figmaUIApi, figmaMetaData }}>
      <SettingsContext.Provider value={{ settings, updateSettings }}>
        <TokenContext.Provider value={{ tokens, setTokens }}>
          <main className={style} onKeyDown={e => handleKeyboardInput(e, figmaUIApi)}>
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

const root = createRoot(document.getElementById('pluginUI')) // createRoot(container!) if you use TypeScript
root.render(<PluginUi />)
