import { defaultSettings } from '@config/defaultSettings'
import { Settings } from '@typings/settings'
import config from '@config/config'
import { stringifyJson } from './stringifyJson'
/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = (): Settings => {
  const storedSettings: string = figma.root.getPluginData(config.key.settings)
  if (storedSettings === '') {
    return defaultSettings
  }

  return <Settings>Object.fromEntries(Object.entries(defaultSettings).map(([key, value]) => {
    if (value !== undefined && typeof storedSettings[key] !== typeof value) {
      return [key, defaultSettings[key]]
    }
    return [key, storedSettings[key]]
  }))
}

/**
 * @name saveSettings
 * @description save the user settings to the "cache"
 * @param {UserSettings} settings
 */
const setSettings = (settings: Settings) => {
  settings = {
    ...defaultSettings,
    ...settings
  }
  // store public settings that should be shared across org
  figma.root.setPluginData(config.key.settings, stringifyJson(settings))
}

// exports
export { getSettings, setSettings }
