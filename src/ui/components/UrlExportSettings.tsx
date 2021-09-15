import * as React from 'react'
import { useContext } from 'react'
import { Button, Checkbox, Select, Title, Input } from 'react-figma-plugin-ds'
import { FigmaContext, SettingsContext, TokenContext } from '@ui/context'
import { CancelButton } from './CancelButton'
import { css } from '@emotion/css'
import { Footer } from './Footer'
import { prepareExport } from '@src/utilities/prepareExport'
import { Settings } from '@typings/settings'
import { Info } from '@components/Info'
import { Row } from '@components/Row'
import { urlExport } from '../modules/urlExport'
import { urlExportRequestBody, urlExportSettings } from '@typings/urlExportData'
import { PluginMessage } from '@typings/pluginEvent'
import { commands } from '@config/commands'
import { stringifyJson } from '@src/utilities/stringifyJson'
import { WebLink } from './WebLink'

const style = css`
  display: flex;
  flex-direction: column;
  .grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const UrlExportSettings = () => {
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)
  const { tokens, setTokens } = useContext(TokenContext)
  const { figmaUIApi, figmaMetaData } = useContext(FigmaContext)

  const handleFormSubmit = (event) => {
    const exportSettingsForm = event.target
    if (exportSettingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save settings to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: commands.saveSettings,
          payload: {
            settings: pluginSettings,
            accessToken: accessToken
          }
        } as PluginMessage
      // @ts-ignore
      }, '*')
      // prepare token json
      const tokensToExport = prepareExport(tokens, pluginSettings)
      setTokens(tokensToExport)
      // download tokes
      urlExport(parent, {
        url: settings.serverUrl,
        accessToken: settings.accessToken,
        acceptHeader: settings.acceptHeader,
        authType: settings.authType
      } as urlExportSettings,
      {
        event_type: settings.eventType,
        client_payload: {
          tokens: `${stringifyJson(tokensToExport, settings.urlJsonCompression)}`,
          filename: figmaMetaData.filename
        }
      } as urlExportRequestBody)
    }
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)} className={style}>
      <Title size='xlarge' weight='bold'>Url Export settings</Title>
      <Row>
        <Checkbox
          label='Compress JSON output'
          type='switch'
          checked={settings.urlJsonCompression}
          onChange={(value) => updateSettings(draft => { draft.urlJsonCompression = value })}
        />
        <Info width={240} label='Compression removes line breaks and whitespace from the json string' />
      </Row>
      <Title size='xlarge' weight='bold'>Server settings</Title>
      <h3>Event type<Info width={150} label='"event_type" property in post request' /></h3>
      <Row fill>
        <Input
          type='text'
          required
          pattern='^[\w\-\.\+@]+$'
          placeholder='update-tokens'
          value={settings.eventType}
          onChange={value => updateSettings(draft => { draft.eventType = value })}
        />
      </Row>

      <h3>Server url<Info width={150} label='Url the request is sent to, must be https' /></h3>
      <Row fill>
        <Input
          type='text'
          required
          pattern='^https://.*'
          placeholder='https://api.github.com/repos/:username/:repo/dispatches'
          value={settings.serverUrl}
          onChange={value => updateSettings(draft => { draft.serverUrl = value })}
        />
      </Row>

      <h3>Accept header</h3>
      <Row fill>
        <Input
          type='text'
          required
          pattern='\S+'
          placeholder='application/vnd.github.v3+json'
          value={settings.acceptHeader}
          onChange={value => updateSettings(draft => { draft.acceptHeader = value })}
        />
      </Row>

      <h3>Auth type</h3>
      <Row fill>
        <Select
          defaultValue={settings.authType}
          onChange={({ value }) => updateSettings(draft => { draft.authType = value })}
          placeholder='Auth type'
          options={[
            {
              label: '(Github) token',
              value: 'token'
            },
            {
              label: 'Basic authentication',
              value: 'Basic'
            },
            {
              label: 'Bearer token authentication',
              value: 'Bearer'
            }
          ]}
        />
      </Row>

      <h3>Access token</h3>
      <Row fill>
        <Input
          type='text'
          pattern='\S+'
          placeholder='your access token'
          value={settings.accessToken}
          onChange={value => updateSettings(draft => { draft.accessToken = value })}
        />
      </Row>
      <Footer>
        <WebLink align='start' href='https://github.com/lukasoppermann/design-tokens#design-tokens'>Documentation</WebLink>
        <CancelButton />
        <Button type='button' onClick={handleFormSubmit} autofocus>Save & Export</Button>
      </Footer>
    </form>
  )
}
