import { Settings } from '@typings/settings'

export const defaultSettings: Settings = {
  filename: 'design-tokens',
  extension: '.json',
  nameConversion: 'default',
  compression: false,
  urlJsonCompression: true,
  prefix: '_',
  excludePrefix: true,
  serverUrl: undefined,
  eventType: 'update-tokens',
  accessToken: undefined,
  acceptHeader: 'application/vnd.github.everest-preview+json',
  authType: 'token',
  keyInName: false,
  exports: {
    color: true,
    font: true,
    effect: true,
    grid: true,
    border: true,
    breakpoint: true,
    radius: true,
    size: true,
    spacing: true,
    motion: true
  }
}
