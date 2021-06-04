import * as React from 'react'
import { Button, Checkbox } from "react-figma-plugin-ds"
import { CancelButton } from './CancelButton'
import { VersionNotice } from './VersionNotice'
import { setFormSettings, getFormSettings } from '../modules/settings'
import { useContext, useEffect, useRef } from 'react'
import { FigmaContext } from '../context/FigmaContext'

interface SettingsFormProps {
  
}


// saveButton.addEventListener('click', () => {
//   // if form is valid
//   if (settingsForm.checkValidity() === true) {
//     // get values from form
//     const { settings, accessToken } = getFormSettings(settingsForm)
//     // sent to index saveSettings method
//     figmaUIApi.postMessage({
//       pluginMessage: {
//         command: 'saveSettings',
//         settings: settings,
//         accessToken: accessToken
//       }
//     // @ts-ignore
//     }, '*')
//   }
// })

const SettingsForm = () => {
  const figmaUIApi = useContext(FigmaContext)
  const filenameInputRef = useRef(null);

  const saveSettingsHandler = (e) => {
    const settingsForm = e.target.closest('form')
    // check form
    if (settingsForm.checkValidity() === true) {
      // get values from form
      const { settings, accessToken } = getFormSettings(settingsForm)
      // sent to index saveSettings method
      figmaUIApi.postMessage({
        pluginMessage: {
          command: 'saveSettings',
          settings: settings,
          accessToken: accessToken
        }
      // @ts-ignore
      }, '*')
    }
  }

  useEffect(() => {
    filenameInputRef.current.focus()
  })

  
  return <form id="settingsForm" className="plugin-ui-content">
    <VersionNotice />
    <h3>Design Token Settings</h3>
    <div className="input flex-horizontal">
      <div className="label">Filename:</div>
      <input required pattern="^[\w\-\.\+@]+$" ref={filenameInputRef} type="text" id="filename" className="input__field with-inside-label-behind-sm" placeholder="design-tokens" value="design-tokens" />
      <div className="label inside-label-behind--sm">.json</div>
    </div>
    <div className="flex-horizontal">
      <div className="label" data-style="width: 130px !important">Name conversion:</div>
      <select id="nameConversion" className="select-css">
        <option value="default">Default</option>
        <option value="camelCase">camelCase</option>
        <option value="kebabCase">kebab-case</option>
      </select>
    </div>
    <div className="section-title">Prefix</div>
    <div className="message-box">
      <div className="message message--info">Define a prefix for styles to be in-/excluded.</div>
    </div>
    <div className="flex-horizontal">
      <div className="input flex-horizontal">
        <div className="label">Prefix:</div>
        <input required pattern="\S+" type="text" id="prefix" className="input__field" placeholder="_" value="_" />
      </div>
      <div className="switch">
        {/* <input className="switch__toggle" type="checkbox" id="excludePrefix" checked /> */}
        <Checkbox
          label="Toggle me"
          type="switch"
          id="excludePrefix"
        />
        <label className="switch__label" htmlFor="excludePrefix">Exclude<span className="toggleText"></span></label>
      </div>
    </div>
    <div className="section-title">Push to server</div>
    <div className="input flex-horizontal">
      <div className="label" data-style="width: 110px !important">Event type:</div>
      <input required pattern="^[\w\-\.\+@]+$" type="text" id="eventType" className="input__field" placeholder="update-tokens" value="update-tokens" />
      <div className="label label--info">"event_type" property in post request</div>
    </div>
    <div className="input flex-horizontal">
      <div className="label" data-style="width: 110px !important">Server url:</div>
      <input type="text" pattern="^https://.*" id="serverUrl" className="input__field" placeholder="https://api.github.com/repos/:username/:repo/dispatches" />
    </div>
    <div className="input flex-horizontal">
      <div className="label" data-style="width: 110px !important">Accept header:</div>
      <input type="text" pattern="\S+" id="acceptHeader" className="input__field" placeholder="accept header" value='application/vnd.github.everest-preview+json' />
    </div>
    <div className="flex-horizontal">
      <div className="label" data-style="width: 110px !important">Auth type:</div>
      <select id="authType" className="select-css">
        <option value="token">(Github) token</option>
        <option value="Basic">Basic authentication</option>
        <option value="Bearer">Bearer token authentication</option>
      </select>
    </div>
    <div className="input flex-horizontal">
      <div className="label" data-style="width: 110px !important">Access token:</div>
      <input type="text" pattern="\S+" id="accessToken" className="input__field" placeholder="your access token" />
    </div>
    <footer>
      <CancelButton />
      <Button onClick={saveSettingsHandler}>Save changes!!!</Button>
      {/* <button id="saveButton" className='button button--primary' type="submit">Save changes</button> */}
    </footer>
  </form>
}

export { SettingsForm }