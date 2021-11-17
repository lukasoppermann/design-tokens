/* istanbul ignore file */
import { Settings } from '@typings/settings'

export const defaultSettings: Settings = {
  filename: '',
  extension: '.tokens.json',
  nameConversion: 'default',
  tokenFormat: 'standard',
  compression: false,
  urlJsonCompression: true,
  serverUrl: undefined,
  eventType: 'update-tokens',
  accessToken: undefined,
  acceptHeader: 'application/vnd.github.everest-preview+json',
  authType: 'token',
  exclusionPrefix: '',
  alias: 'alias, ref, reference',
  aliasAddValue: true,
  keyInName: false,
  prefixInName: true,
  prefix: {
    color: 'color',
    gradient: 'gradient',
    typography: 'typography',
    font: 'font',
    effect: 'effect',
    grid: 'grid',
    border: 'border, borders',
    breakpoint: 'breakpoint, breakpoints',
    radius: 'radius, radii',
    size: 'size, sizes',
    spacing: 'spacing',
    motion: 'motion'
  },
  exports: {
    color: true,
    gradient: true,
    font: true,
    typography: true,
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
