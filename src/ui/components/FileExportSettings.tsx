import * as React from 'react'
import { useContext, useRef } from 'react'
import { Button, Title } from 'react-figma-plugin-ds'
import { FigmaContext, SettingsContext, TokenContext } from '../context'
// import { downloadJson } from '../modules/downloadJson'
// import { prepareExport } from '../../utilities/prepareExport'
import { CancelButton } from './CancelButton'
// import { Settings } from '../../../types/settings'
import { css } from '@emotion/css'
import { Footer } from './Footer'
// import { Info } from './Info'
// import { Row } from './Row'
// import { tokenTypes } from '@config/tokenTypes'

const style = css`
  display: flex;
  flex-direction: column;
  .grid-3-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`

export const FileExportSettings = () => {
  const { settings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)
  const { tokens, setTokens } = useContext(TokenContext)
  // const figmaUIApi = useContext(FigmaContext)
  const downloadLinkRef = useRef()

  const handleFormSubmit = (event) => {
    // const exportSettingsForm = event.target
    // if (exportSettingsForm.checkValidity() === true) {
    //   const { accessToken, ...pluginSettings } = settings
    //   // save settings to local storage
    //   figmaUIApi.postMessage({
    //     pluginMessage: {
    //       command: 'saveSettings',
    //       settings: pluginSettings,
    //       accessToken: accessToken
    //     }
    //   // @ts-ignore
    //   }, '*')
    //   // prepare token json
    //   const tokensToExport = 'prepareExport(tokens, pluginSettings)'
    //   setTokens(tokensToExport)
    //   // download tokes
    //   downloadJson(parent, downloadLinkRef.current, tokens)
    // }
    console.log('submit')
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)} className={style}>
      <Title size='xlarge' weight='bold'>File Export settings</Title>
      {/* <Row>
        <Checkbox
          label='Add type to name'
          type='switch'
          checked={settings.keyInName}
          onChange={value => updateSettings(draft => { draft.keyInName = value })}
        />
        <Info width={240} label='The token type (e.g. "colors" or "fonts") will be prepended to the tokens name' />
      </Row>
      <Title size='large' weight='bold'>Include type in export</Title>
      <div className='grid-3-col'>
        {Object.entries(tokenTypes).map(([, { key, label }]) =>
          <Checkbox
            key={key}
            label={label}
            checked={settings.exports[key]}
            onChange={value => updateSettings((draft: Settings) => { draft.exports[key] = value })}
          />)}
      </div> */}
      <Footer>
        {/* <Button
          type='button' onClick={() => {
            const { accessToken, ...pluginSettings } = settings
            prepareExport(tokens, pluginSettings) }}
        >Test
        </Button> */}
        <CancelButton />
        <Button autofocus>Save & Export</Button>
      </Footer>
      <a
        ref={downloadLinkRef}
        download={`${settings.filename}${settings.extension}`}
        title={`${settings.filename}${settings.extension}`}
        href={`data:text/json;charset=utf-8,${encodeURIComponent(tokens)}`}
      />
    </form>
  )
}
