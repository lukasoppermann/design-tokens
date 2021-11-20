import * as React from 'react'
import { useContext, useRef } from 'react'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { Title } from '@components/Title'
import { FigmaContext, SettingsContext, TokenContext } from '@ui/context'
import { CancelButton } from './CancelButton'
import { css } from '@emotion/css'
import { Footer } from './Footer'
import { downloadJson } from '../modules/downloadJson'
import { prepareExport } from '@src/utilities/prepareExport'
import { Settings } from '@typings/settings'
import { stringifyJson } from '@src/utilities/stringifyJson'
import { Info } from '@components/Info'
import { Row } from '@components/Row'
import { tokenTypes } from '@config/tokenTypes'
import { commands } from '@config/commands'
import config from '@config/config'
import { WebLink } from './WebLink'

const style = css`
  display: flex;
  flex-direction: column;
  .grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .no-flex-grow {
    flex-grow: 0;
  }
`

export const FileExportSettings = () => {
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)
  const { tokens, setTokens } = useContext(TokenContext)
  const { figmaUIApi } = useContext(FigmaContext)
  const downloadLinkRef = useRef()

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
        }
      // @ts-ignore
      }, '*')
      // prepare token json
      const tokensToExport = prepareExport(tokens, pluginSettings)
      setTokens(tokensToExport)
      // download tokes
      downloadJson(parent, downloadLinkRef.current, stringifyJson(tokensToExport, pluginSettings.compression))
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={style}>
      <Title size='xlarge' weight='bold'>File Export settings</Title>
      <Row>
        <Checkbox
          label='Compress JSON output file'
          type='switch'
          checked={settings.compression}
          onChange={(value) => updateSettings(draft => { draft.compression = value })}
        />
        <Info width={240} label='Compression removes line breaks and whitespace from the json string' />
      </Row>
      <h3>Filename</h3>
      <Row fill>
        <Input
          type='text'
          pattern='^[\w\-\.\+@]+$'
          placeholder='design-tokens'
          value={settings.filename}
          onChange={value => updateSettings((draft: Settings) => { draft.filename = value })}
        />
        <Select
          defaultValue={settings.extension}
          onChange={({ value }) => updateSettings((draft: Settings) => { draft.extension = value as string })}
          placeholder='file extension'
          options={config.fileExtensions}
        />
      </Row>
      <Title size='large' weight='bold'>Include types in export</Title>
      <div className='grid-3-col'>
        {Object.entries(tokenTypes).map(([, { key, label }]) =>
          <Checkbox
            key={key}
            label={label}
            checked={settings.exports[key]}
            onChange={value => updateSettings((draft: Settings) => { draft.exports[key] = value })}
          />)}
      </div>
      <Footer>
        <WebLink align='start' href='https://github.com/lukasoppermann/design-tokens#design-tokens'>Documentation</WebLink>
        <CancelButton />
        <Button type='submit' autofocus>Save & Export</Button>
      </Footer>
      <a
        ref={downloadLinkRef}
        download={`${settings.filename}${settings.extension}`}
        title={`${settings.filename}${settings.extension}`}
      />
    </form>
  )
}
