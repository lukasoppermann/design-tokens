import settingsDefault from './settingsDefault'
const settingsKeys = {
  settings: 'settings',
  privateSettings: 'privateSettings'
}
/**
 * get the current users settings
 * for settings that are not set, the defaults will be used
 * @param userSettings object users current settings
 * @return object
 */
const getSettings = (userSettings?: object) => {
  // init settings object
  const settings = {}
  // fill with user settings or defaults
  Object.entries(settingsDefault.settings).forEach(([key, value]) => {
    if (userSettings !== undefined && userSettings[key] !== undefined ) {
      return settings[key] = userSettings[key]
    }
    return settings[key] = value.default
  })
  // return settings
  return settings
}
/**
 * get the current users private settings
 * for settings that are not set, the defaults will be used
 * @param userPrivateSettings object users current settings
 * @return object
 */
const getPrivateSettings = (userPrivateSettings: object) => {
  // init privateSettings object
  const privateSettings = {}
  // fill with user private settings or defaults
  Object.entries(settingsDefault.privateSettings).forEach(([key, value]) => {
    if (privateSettings !== undefined && privateSettings[key] !== undefined) {
      return privateSettings[key] = privateSettings[key]
    }
    return privateSettings[key] = value.default
  })
}

// exports
export { settingsKeys, getSettings, getPrivateSettings }