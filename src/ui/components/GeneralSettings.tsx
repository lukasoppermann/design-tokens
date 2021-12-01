import * as React from 'react'
import { Button } from '@components/Button'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { Label } from '@components/Label'
import { Title } from '@components/Title'
import { Text } from '@components/Text'
import { CancelButton } from '@components/CancelButton'
import { useContext } from 'react'
import { FigmaContext, SettingsContext } from '@ui/context'
import { css } from '@emotion/css'
import { commands } from '@config/commands'
import { Footer } from '@components/Footer'
import { nameConversionType, Settings, tokenFormatType } from '@typings/settings'
import { Row } from '@components/Row'
import { Info } from '@components/Info'
import { Separator } from './Separator'
import { WebLink } from './WebLink'

const style = css`
  display: flex;
  flex-direction: column;
  .grid-2-col {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const labelStyle = css`
  width: 85px;
`

const textStyle = css`
  padding: 0 var(--size-xxxsmall) 0 var(--size-xxsmall);
  color: var(--black6);
  margin-top: 0;
`

const isStyle = (key: string): boolean => ['color', 'gradient', 'grid', 'effect', 'font'].includes(key)

export const GeneralSettings = () => {
  const { figmaUIApi } = useContext(FigmaContext)
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)

  const handleFormSubmit = (event) => {
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
    <form className={style} onSubmit={handleFormSubmit}>
      <Title size='xlarge' weight='bold'>Design Token Settings</Title>
      <Row>
        <Checkbox
          label='Add token type to name of the token'
          type='switch'
          checked={settings.keyInName}
          onChange={value => updateSettings(draft => { draft.keyInName = value })}
        />
        <Info width={240} label='The token type (e.g. "color" or "font") will be added to the name e.g. "color/light/bg".' />
      </Row>
      <Separator />
      <div className='grid-2-col'>
        <div>
          <Title size='small' weight='bold'>Name conversion</Title>
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
        </div>
        <div>
          <Title size='small' weight='bold'>Token format<Info width={240} label='The structure of the output json file. Learn more in the docs.' /></Title>
          <Select
            defaultValue={settings.tokenFormat}
            onChange={({ value }) => updateSettings((draft: Settings) => { draft.tokenFormat = value as tokenFormatType })}
            placeholder='Token format'
            options={[
              {
                label: 'Standard (W3C draft)',
                value: 'standard'
              },
              {
                label: 'Original (deprecated)',
                value: 'original'
              }
            ]}
          />
        </div>
      </div>
      <Title size='small' weight='bold'>Exclusion prefix <Info width={240} label='Styles & tokens with this prefix will be ignored when exporting. ("." and "_" work by default)' /></Title>
      <Row fill>
        <Input
          type='text'
          pattern='^[#\+*\\/&%$!?;:~,\s]+$'
          placeholder='#, @'
          value={settings.exclusionPrefix}
          onChange={value => updateSettings((draft: Settings) => { draft.exclusionPrefix = value })}
        />
      </Row>
      <Title size='small' weight='bold'>Token prefixes <Info width={150} label='Use commas to separate multiple prefixed' /></Title>
      <Text className={textStyle} size='small'>
        Prefixes are the first part of a tokens name e.g. "radius" in "radius/small". They are used to identify the type of a custom token.
      </Text>
      <Row>
        <Checkbox
          label='Include token prefix in token names'
          type='switch'
          checked={settings.prefixInName}
          onChange={(value) => updateSettings(draft => { draft.prefixInName = value })}
        />
        <Info width={240} label='When disabled the prefix is removed ("radius/small" → "small"), when enabled it is added ("radius/small" → "radius/small").' />
      </Row>
      <Separator />
      <div className='grid-2-col'>
        {Object.entries(settings.prefix).map(([key, currentValue]) =>
          <Row fill key={key}>
            <Label
              className={`${labelStyle} flex-grow--none`}
            >{key}
              {isStyle(key) ? <Info width={90} label='Prefix for style' /> : ''}
            </Label>
            <Input
              type='text'
              // eslint-disable-next-line
              pattern={isStyle(key) ? '^[\\w\\-@]+$' : '^[\\w\\-@,\\s]+$'}
              required
              placeholder='Color'
              value={currentValue}
              onChange={value => updateSettings((draft: Settings) => { draft.prefix[key] = value })}
            />
          </Row>
        )}
      </div>
      <Footer>
        <WebLink align='start' href='https://github.com/lukasoppermann/design-tokens#design-tokens'>Documentation</WebLink>
        <CancelButton />
        <Button type='submit' autofocus>Save changes</Button>
      </Footer>
    </form>
  )
}
