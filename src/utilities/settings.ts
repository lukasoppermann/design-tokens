import settingsDefault from './settingsDefault'
import UserSettings from '../../types/settings'
const settingsKey = 'settings'
/**
 * Function sanitizes and prepares settings to be stored
 * @param newSettings
 * @param currentSettings
 */
const settingsPrepare = (newSettings: UserSettings, currentSettings: UserSettings): UserSettings => {
  // initialize object
  const mergedSettings = {}
  // add public settings
  for (const [key, value] of Object.entries(settingsDefault)) {
    // avoid empty values
    if (typeof value.default === 'string' && value.empty === false) {
      if (newSettings[key].trim() === '') {
        newSettings[key] = currentSettings[key] || value.default
      }
    }
    // if valid new settings
    if (typeof newSettings[key] === typeof value.default) {
      mergedSettings[key] = newSettings[key]
    }
    // if valid current settings
    else if (typeof currentSettings[key] === typeof value.default) {
      mergedSettings[key] = currentSettings[key]
    }
    else {
      // if both new and old value don't fit, use default
      mergedSettings[key] = value.default
    }
  }
  // return merged settings object
  return <UserSettings>mergedSettings
}
/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @return object
 */
const getSettings = (): UserSettings => {
  let userSettings = figma.root.getPluginData(settingsKey)
  if (userSettings.length > 0) {
    userSettings = JSON.parse(userSettings)
  }
  else {
    userSettings = undefined
  }
  // init settings object
  const settings = {}
  // fill with user settings or defaults
  Object.entries(settingsDefault).forEach(([key, value]) => {
    if (userSettings !== undefined && userSettings[key] !== undefined) {
      return settings[key] = userSettings[key]
    }
    return settings[key] = value.default
  })

  return <UserSettings>settings
}

/**
 * @name saveSettings
 * @description save the user settings to the "cache"
 * @param {UserSettings} settings
 */
const setSettings = (settings: UserSettings) => {
  settings = settingsPrepare(settings, getSettings())
  // store public settings that should be shared across org
  figma.root.setPluginData(settingsKey, JSON.stringify(settings, null, 2))
}

// exports
export { settingsKey, getSettings, setSettings }
