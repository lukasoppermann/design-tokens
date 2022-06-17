import { defaultSettings } from '@config/defaultSettings'
import { Settings } from '@typings/settings'
import config from '@config/config'
import { stringifyJson } from './stringifyJson'

const fixMissing = (defaults, current) => Object.fromEntries(Object.entries(defaults).map(([key, value]) => {
  if (value !== undefined && typeof current[key] !== typeof value) {
    return [key, defaults[key]]
  }
  return [key, current[key]]
}))

/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = (): Settings => {
  let storedSettings: string = figma.root.getPluginData(config.key.settings)
  // return defaults if no settings are present
  if (storedSettings === '') {
    return defaultSettings
  }
  // parse stored settings
  storedSettings = JSON.parse(storedSettings)
  // fix issues on first level
  const fixedSettings = fixMissing(defaultSettings, storedSettings)
  fixedSettings.prefix = fixMissing(defaultSettings.prefix, fixedSettings.prefix)
  fixedSettings.exports = fixMissing(defaultSettings.exports, fixedSettings.exports)
  // return settings
  return <Settings>fixedSettings
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
/**
 * @name resetSettings
 * @description resetSettings the user settings to the "cache"
 */
const resetSettings = () => figma.root.setPluginData(config.key.settings, stringifyJson(defaultSettings))

// exports
export { getSettings, setSettings, resetSettings }
