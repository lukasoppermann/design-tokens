import * as React from 'react'
import { Button, Checkbox, Input, Label, Select, Title } from 'react-figma-plugin-ds'
import { CancelButton } from '@components/CancelButton'
import { useContext } from 'react'
import { FigmaContext, SettingsContext } from '@ui/context'
import { css } from '@emotion/css'
import { commands } from '@config/commands'
import { Footer } from '@components/Footer'
import { nameConversionType, Settings } from '@typings/settings'
import { Row } from '@components/Row'
import { Info } from '@components/Info'

const style = css`
  display: flex;
  flex-direction: column;
`

const labelStyle = css`
  width: 85px;
`

export const GeneralSettings = () => {
  const { figmaUIApi } = useContext(FigmaContext)
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)

  const settingsFormSubmitHandler = (event) => {
    const settingsForm = event.target
    if (settingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save date to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: commands.saveSettings,
          payload: {
            closePlugin: true,
            settings: pluginSettings,
            accessToken: accessToken
          }
        }
      // @ts-ignore
      }, '*')
    }
  }

  return (
    <form className={style} onSubmit={settingsFormSubmitHandler}>
      <Title size='xlarge' weight='bold'>Design Token Settings</Title>
      <Row>
        <Checkbox
          label='Add token type to name of the token'
          type='switch'
          checked={settings.keyInName}
          onChange={value => updateSettings(draft => { draft.keyInName = value })}
        />
        <Info width={240} label='The token type (e.g. "colors" or "fonts") will be prepended to the tokens name' />
      </Row>
      <h3>Token prefixes <Info width={240} label='Use commas to separate multiple prefixed' /></h3>
      {Object.entries(settings.prefix).map(([key, currentValue]) =>
        <Row fill key={key}>
          <Label
            className={`${labelStyle} flex-grow--none`}
            size='small'
            weight='medium'
          >{key}
          </Label>
          <Input
            type='text'
            pattern='^[\w\-@,\s]+$'
            placeholder='Color'
            value={currentValue}
            onChange={value => updateSettings((draft: Settings) => { draft.prefix[key] = value })}
          />
        </Row>
      )}
      <Title size='small' weight='bold'>Name conversion</Title>
      <Row fill>
        <Select
          defaultValue={settings.nameConversion}
          onChange={({ value }) => updateSettings((draft: Settings) => { draft.nameConversion = value as nameConversionType })}
          placeholder='Name conversion'
          options={[
            {
              label: 'Default',
              value: 'default'
            },
            {
              label: 'camelCase',
              value: 'camelCase'
            },
            {
              label: 'kebab-case',
              value: 'kebabCase'
            }
          ]}
        />
      </Row>
      <Footer>
        <CancelButton />
        <Button>Save changes</Button>
      </Footer>
    </form>
  )
}
