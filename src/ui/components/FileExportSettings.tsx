import * as React from 'react'
import { useContext, useRef } from 'react'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { Title } from '@components/Title'
import { FigmaContext, SettingsContext, TokenContext } from '@ui/context'
import { css } from '@emotion/css'
import { Footer } from '@components/Footer'
import { downloadJson } from '../modules/downloadJson'
import { prepareExport } from '@utils/prepareExport'
import { Settings } from '@typings/settings'
import { stringifyJson } from '@utils/stringifyJson'
import { Info } from '@components/Info'
import { Row } from '@components/Row'
import { tokenTypes } from '@config/tokenTypes'
import { commands } from '@config/commands'
import { WebLink } from '@components/WebLink'

const style = css`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  h1:first-child {
    margin-top: 0 !important;
  }
  .grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FileExportSettings = () => {
  const { settings, updateSettings } = useContext<{
    settings: Settings;
    updateSettings: any;
  }>(SettingsContext)
  const { tokens } = useContext(TokenContext)
  const { figmaUIApi } = useContext(FigmaContext)
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
    const { accessToken, ...pluginSettings } = settings

    figmaUIApi.postMessage(
      {
        pluginMessage: {
          command: commands.saveSettings,
          payload: {
            settings: pluginSettings,
            accessToken: accessToken
          }
        }
      },
      '*'
    )
  }, [settings])

  const handleFormSubmit = (event) => {
    event.preventDefault() // Prevent form submit triggering navigation
    const exportSettingsForm = event.target
    console.log('[Design Tokens] Export submit triggered', {
      hasTokens: Boolean(tokens),
      tokenStringLength: typeof tokens === 'string' ? tokens.length : null,
      filename: settings.filename,
      extension: settings.extension,
      compression: settings.compression
    })
    if (exportSettingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      console.log('[Design Tokens] Export settings are valid', pluginSettings)
      // save settings to local storage
      figmaUIApi.postMessage(
        {
          pluginMessage: {
            command: commands.saveSettings,
            payload: {
              settings: pluginSettings,
              accessToken: accessToken
            }
          }
        },
        '*'
      )
      // prepare token json
      if (!tokens || tokens === '[]' || tokens === '{}') {
        console.warn('[Design Tokens] Export aborted because there are no tokens to export')
        figmaUIApi.postMessage(
          {
            pluginMessage: {
              command: commands.closePlugin,
              payload: {
                notification: '⛔️ No tokens to export!'
              }
            }
          },
          '*'
        )
        return
      }

      const tokensToExport = prepareExport(tokens, pluginSettings)
      console.log('[Design Tokens] Tokens prepared for export', {
        tokenCount: Array.isArray(tokensToExport) ? tokensToExport.length : null,
        tokenType: typeof tokensToExport
      })

      if (downloadLinkRef.current === null) {
        console.error('[Design Tokens] Download link ref is null, export cannot continue')
        return
      }
      console.log('[Design Tokens] Starting download', {
        downloadName: `${settings.filename}${settings.extension}`
      })
      // download tokes
      downloadJson(
        parent,
        downloadLinkRef.current,
        stringifyJson(tokensToExport, pluginSettings.compression)
      )
    } else {
      console.warn('[Design Tokens] Export settings form is invalid')
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={style}>
      <Title size="xlarge" weight="bold">
        File Export settings
      </Title>
      <Row>
        <Checkbox
          label="Compress JSON output file"
          type="switch"
          checked={settings.compression}
          onChange={(value) =>
            updateSettings((draft) => {
              draft.compression = value
            })
          }
        />
        <Info
          width={240}
          label="Compression removes line breaks and whitespace from the json string"
        />
        {settings.tokenFormat === 'standard' && (
          <>
            <Checkbox
              label="Exclude extension property"
              type="switch"
              checked={settings.excludeExtensionProp}
              onChange={(value) =>
                updateSettings((draft) => {
                  draft.excludeExtensionProp = value
                })
              }
            />
            <Info
              width={240}
              label="The extension property holds additional information about the token"
            />
          </>
        )}
      </Row>
      <Title size="large" weight="bold">
        Include types in export
      </Title>
      <div className="grid-3-col">
        {Object.entries(tokenTypes)
          .map(
            ([, { key, label, exclude = undefined }]) =>
              (exclude === undefined ||
                !exclude.includes(settings.tokenFormat)) && (
                <Checkbox
                  key={key}
                  label={label}
                  checked={settings.exports[key]}
                  onChange={(value) =>
                    updateSettings((draft: Settings) => {
                      draft.exports[key] = value
                    })
                  }
                />
              )
          )}
      </div>
      <Footer>
        <WebLink
          align="start"
          href="https://github.com/lukasoppermann/design-tokens#design-tokens"
        >
          Documentation
        </WebLink>
        <Button type="submit" autofocus>
          Export
        </Button>
      </Footer>
      <a
        ref={downloadLinkRef}
        download={`${settings.filename}${settings.extension}`}
        title={`${settings.filename}${settings.extension}`}
      />
    </form>
  )
}
