export type nameConversionType =
  'default' |
  'camelCase' |
  'kebabCase'

export type Settings = {
  filename: string,
  nameConversion: nameConversionType,
  excludePrefix: boolean,
  prefix: string,
  serverUrl?: string,
  eventType: string,
  accessToken?: string,
  acceptHeader?: string,
  authType: string
}
