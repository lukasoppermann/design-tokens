import * as React from 'react'
import { Button, Checkbox, Select } from 'react-figma-plugin-ds'
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
      <h3>Design Token Settings</h3>
      <div className='input flex-horizontal'>
        <div className='label'>Filename:</div>
        <input
          autoFocus required pattern='^[\w\-\.\+@]+$' type='text' id='filename' className='input__field with-inside-label-behind-sm' placeholder='design-tokens' value={settings.filename}
          onChange={e => updateSettings((draft: Settings) => { draft.filename = e.target.value })}
        />
        <div className='label inside-label-behind--sm'>.json</div>
      </div>
      <div className='flex-horizontal'>
        <div className='flex-half'>
          <div className='label' data-style='width: 130px !important'>Name conversion</div>
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
      </div>
      <Row>
        <Checkbox
          label='Add token type to name of the token'
          type='switch'
          checked={settings.keyInName}
          onChange={value => updateSettings(draft => { draft.keyInName = value })}
        />
        <Info width={240} label='The token type (e.g. "colors" or "fonts") will be prepended to the tokens name' />
      </Row>
      <Footer>
        <CancelButton />
        <Button>Save changes</Button>
      </Footer>
    </form>
  )
}
