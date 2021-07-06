export type nameConversionType =
  'default' |
  'camelCase' |
  'kebabCase'

export type Settings = {
  filename: string,
  extension: string,
  nameConversion: nameConversionType,
  compression: boolean,
  urlJsonCompression: boolean,
  serverUrl?: string,
  eventType: string,
  accessToken?: string,
  acceptHeader?: string,
  authType: string,
  keyInName: boolean,
  prefix: {
    color: string,
    font: string,
    effect: string,
    grid: string,
    border: string,
    breakpoint: string,
    radius: string,
    size: string,
    spacing: string,
    motion: string
  }
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
