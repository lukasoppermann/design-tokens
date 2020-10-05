// settings structure & default values
const settingsStructure = {
  settings: {
    excludePrefix: {
      default: true,
      empty: false
    },
    prefix: {
      default: "_",
      empty: false
    }
  }
}
/**
 * Function sanitizes and prepares settings to be stored
 * @param newSettings 
 * @param currentSettings 
 */
const prepareSettings = (newSettings, currentSettings): {
  settings: any,
  secretSettings: any
} => {
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

  return {
    settings: mergedSettings.settings,
    secretSettings: mergedSettings.secretSettings
  }
}

export default prepareSettings