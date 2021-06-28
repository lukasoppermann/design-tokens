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
  const figmaUIApi = useContext(FigmaContext)

  const handleFormSubmit = (event) => {
    const exportSettingsForm = event.target
    if (exportSettingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save settings to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: 'saveSettings',
          settings: pluginSettings,
          accessToken: accessToken
        }
      // @ts-ignore
      }, '*')
      // prepare token json
      const tokensToExport = prepareExport(tokens, pluginSettings)
      setTokens(tokensToExport)
      // download tokes
      console.log(pluginSettings)
      console.log(tokensToExport)
    }
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)} className={style}>
      <Title size='xlarge' weight='bold'>Url Export settings</Title>
      <Row>
        <Checkbox
          label='Compress JSON output file'
          type='switch'
          checked={settings.compression}
          onChange={(value) => updateSettings(draft => { draft.compression = value })}
        />
        <Info width={240} label='Compression removes line breaks and whitespace from the json string' />
      </Row>
      <Title size='xlarge' weight='bold'>Server settings</Title>
      <h3>Event type<Info width={150} label='"event_type" property in post request' /></h3>
      <Row>
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
      <Row>
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
      <Row>
        <Input
          type='text'
          required
          pattern='\S+'
          placeholder='application/vnd.github.everest-preview+json'
          value={settings.acceptHeader}
          onChange={value => updateSettings(draft => { draft.acceptHeader = value })}
        />
      </Row>

      <h3>Auth type</h3>
      <Row>
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
      <Row>
        <Input
          type='text'
          pattern='\S+'
          placeholder='your access token'
          value={settings.accessToken}
          onChange={value => updateSettings(draft => { draft.accessToken = value })}
        />
      </Row>
      <Footer>
        <CancelButton />
        <Button type='button' onClick={handleFormSubmit}>Test</Button>
        <Button autofocus>Save & Export</Button>
      </Footer>
    </form>
  )
}
