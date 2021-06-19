export type nameConversionType =
  'default' |
  'camelCase' |
  'kebabCase'

export type Settings = {
  filename: string,
  extension: string,
  nameConversion: nameConversionType,
  compression: boolean,
  excludePrefix: boolean,
  prefix: string,
  serverUrl?: string,
  eventType: string,
  accessToken?: string,
  acceptHeader?: string,
  authType: string,
  keyInName: boolean,
  exports: {
    color: boolean,
    font: boolean,
    effect: boolean,
    grid: boolean,
    border: boolean,
    breakpoint: boolean,
    radius: boolean,
    size: boolean,
    spacing: boolean,
    motion: boolean
  }
}
