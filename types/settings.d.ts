type UserSettings = {
  filename: string,
  excludePrefix: boolean,
  prefix: string
}

type PrivateUserSettings = {
  sendToUrl: boolean
}

type Settings = {
  settings: UserSettings,
  privateSettings: PrivateUserSettings
}

export { Settings, UserSettings, PrivateUserSettings }