export type nameConversionType =
  'default' |
  'camelCase' |
  'kebabCase'

export type tokenFormatType =
  'standard' |
  'original'

export type Settings = {
  filename: string,
  extension: string,
  nameConversion: nameConversionType,
  tokenFormat: tokenFormatType,
  compression: boolean,
  urlJsonCompression: boolean,
  serverUrl?: string,
  eventType: string,
  accessToken?: string,
  acceptHeader?: string,
  exclusionPrefix: string,
  authType: string,
  keyInName: boolean,
  prefixInName: boolean,
  prefix: {
    color: string,
    gradient: string,
    font: string,
    typography: string,
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
    gradient: boolean,
    font: boolean,
    typography: boolean,
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
