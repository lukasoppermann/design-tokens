/* istanbul ignore file */
import { Settings } from '@typings/settings'

export const defaultSettings: Settings = {
  filename: 'design-tokens',
  extension: '.json',
  nameConversion: 'default',
  compression: false,
  urlJsonCompression: true,
  serverUrl: undefined,
  eventType: 'update-tokens',
  accessToken: undefined,
  acceptHeader: 'application/vnd.github.everest-preview+json',
  authType: 'token',
  keyInName: false,
  prefix: {
    color: 'color',
    font: 'font',
    effect: 'effect',
    grid: 'grid',
    border: 'border',
    breakpoint: 'breakpoint',
    radius: 'radius',
    size: 'size',
    spacing: 'spacing',
    motion: 'motion'
  },
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
