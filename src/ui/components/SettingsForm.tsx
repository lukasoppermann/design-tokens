import * as React from 'react'
import { Button, Checkbox, Select } from 'react-figma-plugin-ds'
import { CancelButton } from './CancelButton'
import { VersionNotice } from './VersionNotice'
// import { getFormSettings } from '../modules/settings'xx
import { useContext } from 'react'
import { FigmaContext } from '../context/FigmaContext'
import { SettingsContext } from '../context/SettingsContext'

// interface SettingsFormProps {

// }

const SettingsForm = () => {
  const figmaUIApi = useContext(FigmaContext)
  const { state: settings, dispatch: dispatchSettings } = useContext(SettingsContext)

  const settingsFormSubmitHandler = (event) => {
    const settingsForm = event.target
    if (settingsForm.checkValidity() === true) {
      const { accessToken, ...pluginSettings } = settings
      // save date to local storage
      figmaUIApi.postMessage({
        pluginMessage: {
          command: 'saveSettings',
          settings: pluginSettings,
          accessToken: accessToken
        }
      // @ts-ignore
      }, '*')
    }
  }
  return (
    <form id='settingsForm' className='plugin-ui-content' onSubmit={settingsFormSubmitHandler}>
      <VersionNotice versionDifference={settings.versionDifferece} />
      <h3>Design Token Settings</h3>
      <div className='input flex-horizontal'>
        <div className='label'>Filename:</div>
        <input
          autoFocus required pattern='^[\w\-\.\+@]+$' type='text' id='filename' className='input__field with-inside-label-behind-sm' placeholder='design-tokens' value={settings.filename}
          onChange={(e) => {
            dispatchSettings({ type: 'update', fieldName: 'filename', payload: e.target.value })
          }}
        />
        <div className='label inside-label-behind--sm'>.json</div>
      </div>
      <div className='flex-horizontal'>
        <div className='label' data-style='width: 130px !important'>Name conversion:</div>
        <Select
          defaultValue={settings.nameConversion}
          onChange={({ value }) => {
            dispatchSettings({ type: 'update', fieldName: 'nameConversion', payload: value })
          }}
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
      <div className='section-title'>Prefix</div>
      <div className='message-box'>
        <div className='message message--info'>Define a prefix for styles to be in-/excluded.</div>
      </div>
      <div className='flex-horizontal'>
        <div className='input flex-horizontal'>
          <div className='label'>Prefix:</div>
          <input
            required pattern='\S+' type='text' id='prefix' className='input__field' placeholder='_' value={settings.prefix}
            onChange={(e) => {
              dispatchSettings({ type: 'update', fieldName: 'prefix', payload: e.target.value })
            }}
          />
        </div>
        <Checkbox
          label={settings.excludePrefix ? 'Exclude (ONLY prefixed styles are included)' : 'Exclude (prefixed styles are excluded)'}
          type='switch'
          checked={settings.excludePrefix}
          onChange={(value) => {
            dispatchSettings({ type: 'update', fieldName: 'excludePrefix', payload: value })
          }}
        />
      </div>
      <div className='section-title'>Push to server</div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Event type:</div>
        <input
          required pattern='^[\w\-\.\+@]+$' type='text' id='eventType' className='input__field' placeholder='update-tokens'
          value={settings.eventType}
          onChange={(e) => {
            dispatchSettings({ type: 'update', fieldName: 'eventType', payload: e.target.value })
          }}
        />
        <div className='label label--info'>"event_type" property in post request</div>
      </div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Server url:</div>
        <input
          type='text' pattern='^https://.*' id='serverUrl' className='input__field' placeholder='https://api.github.com/repos/:username/:repo/dispatches'
          value={settings.serverUrl}
          onChange={(e) => {
            dispatchSettings({ type: 'update', fieldName: 'serverUrl', payload: e.target.value })
          }}
        />
      </div>
      <div className='input flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Accept header:</div>
        <input
          type='text' pattern='\S+' id='acceptHeader' className='input__field' placeholder='accept header'
          // value='application/vnd.github.everest-preview+json'
          value={settings.acceptHeader}
          onChange={(e) => {
            dispatchSettings({ type: 'update', fieldName: 'acceptHeader', payload: e.target.value })
          }}
        />
      </div>
      <div className='flex-horizontal'>
        <div className='label' data-style='width: 110px !important'>Auth type:</div>
        <Select
          defaultValue={settings.authType}
          onChange={({ value }) => {
            dispatchSettings({ type: 'update', fieldName: 'authType', payload: value })
          }}
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
          onChange={(e) => {
            dispatchSettings({ type: 'update', fieldName: 'accessToken', payload: e.target.value })
          }}
        />
      </div>
      <footer>
        <CancelButton />
        <Button>Save changes</Button>
      </footer>
    </form>
  )
}

export { SettingsForm }
