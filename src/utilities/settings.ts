import { defaultSettings } from '@config/defaultSettings'
import { Settings as UserSettings } from '@typings/settings'
import config from '@config/config'
import { stringifyJson } from './stringifyJson'
/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = (): UserSettings => {
  const userSettings = figma.root.getPluginData(config.key.settings)

  return <UserSettings>{
    ...defaultSettings,
    ...(userSettings.length > 0 ? JSON.parse(userSettings) : {})
  }
}

/**
 * @name saveSettings
 * @description save the user settings to the "cache"
 * @param {UserSettings} settings
 */
const setSettings = (settings: UserSettings) => {
  settings = {
    ...defaultSettings,
    ...settings
  }
  // store public settings that should be shared across org
  figma.root.setPluginData(config.key.settings, stringifyJson(settings))
}

// exports
export { getSettings, setSettings }
