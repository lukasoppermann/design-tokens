import * as React from 'react'
import { Button, Checkbox, Select } from 'react-figma-plugin-ds'
import { CancelButton } from './CancelButton'
import { useContext } from 'react'
import { FigmaContext, SettingsContext } from '@ui/context'
import { css } from '@emotion/css'
import { commands } from '@config/commands'
import { Footer } from './Footer'
import { nameConversionType, Settings } from '@typings/settings'

const style = css`
  display: flex;
  flex-direction: column;
`

export const GeneralSettings = () => {
  const figmaUIApi = useContext(FigmaContext)
  const { settings, updateSettings } = useContext<{settings: Settings, updateSettings: any}>(SettingsContext)

  const settingsFormSubmitHandler = (event) => {
    const settingsForm = event.target
    if (settingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save date to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: commands.saveSettings,
          settings: pluginSettings,
          accessToken: accessToken
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
      <div className='section-title'>Prefix</div>
      <div className='message-box'>
        <div className='message message--info'>Define a prefix for styles to be in-/excluded.</div>
      </div>
      <div className='flex-horizontal'>
        <div className='input flex-horizontal'>
          <div className='label'>Prefix:</div>
          <input
            required pattern='\S+' type='text' id='prefix' className='input__field' placeholder='_' value={settings.prefix}
            onChange={(e) => updateSettings(draft => { draft.prefix = e.target.value })}
          />
        </div>
        <Checkbox
          label={settings.excludePrefix ? 'Exclude (prefixed styles are excluded)' : 'Exclude (ONLY prefixed styles are included)'}
          type='switch'
          checked={settings.excludePrefix}
          onChange={value => updateSettings(draft => { draft.excludePrefix = value })}
        />
      </div>
      <div className='section-title'>Push to server</div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Event type:</div>
        <input
          required pattern='^[\w\-\.\+@]+$' type='text' id='eventType' className='input__field' placeholder='update-tokens'
          value={settings.eventType}
          onChange={e => updateSettings(draft => { draft.eventType = e.target.value })}
        />
        <div className='label label--info'>"event_type" property in post request</div>
      </div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Server url:</div>
        <input
          type='text' pattern='^https://.*' id='serverUrl' className='input__field' placeholder='https://api.github.com/repos/:username/:repo/dispatches'
          value={settings.serverUrl}
          onChange={e => updateSettings(draft => { draft.serverUrl = e.target.value })}
        />
      </div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Accept header:</div>
        <input
          type='text' pattern='\S+' id='acceptHeader' className='input__field' placeholder='accept header'
          // value='application/vnd.github.everest-preview+json'
          value={settings.acceptHeader}
          onChange={e => updateSettings(draft => { draft.acceptHeader = e.target.value })}
        />
      </div>
      <div className='flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Auth type:</div>
        <Select
          defaultValue={settings.authType}
          onChange={({ value }) => updateSettings(draft => { draft.authType = value })}
          placeholder='Name conversion'
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
      </div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Access token:</div>
        <input
          type='text' pattern='\S+' id='accessToken' className='input__field' placeholder='your access token'
          value={settings.accessToken}
          onChange={e => updateSettings(draft => { draft.accessToken = e.target.value })}
        />
      </div>
      <Footer>
        <CancelButton />
        <Button>Save changes</Button>
      </Footer>
    </form>
  )
}
