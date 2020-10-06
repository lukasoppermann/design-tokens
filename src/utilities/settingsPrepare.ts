import settingsStructure from './settingsDefault'
import { Settings } from '../../types/settings'
/**
 * Function sanitizes and prepares settings to be stored
 * @param newSettings 
 * @param currentSettings 
 */
const settingsPrepare = (newSettings, currentSettings): Settings => {
  // initialize object
  const mergedSettings = {
    settings: {},
    secretSettings: {}
  }
  // add public settings
  for (const [key, value] of Object.entries(settingsStructure.settings)) {
    // avoid empty values
    if (typeof value.default === "string" && value.empty === false ) {
      if (newSettings[key].trim() === '' ) {
        newSettings[key] = currentSettings.settings[key] || value.default
      }
    }
    // if valid new settings
    if (typeof newSettings[key] === typeof value.default) {
      mergedSettings.settings[key] = newSettings[key]
    }
    // if valid current settings
    else if (typeof currentSettings[key] === typeof value.default) {
      mergedSettings.settings[key] = currentSettings[key]
    }
    else {
      // if both new and old value don't fit, use default
      mergedSettings.settings[key] = value.default
    }
  }
  // return merged settings object
  return {
    // @ts-ignore
    settings: mergedSettings.settings,
    // @ts-ignore
    secretSettings: mergedSettings.secretSettings
  }
}
// expots
export default settingsPrepare