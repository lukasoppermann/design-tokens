import * as React from 'react'
import { Settings } from '../../../types/settings'

export const SettingsContext = React.createContext(null)

export const initialSettings: Settings = {
  filename: 'design-tokens',
  extension: '.json',
  nameConversion: 'default',
  compression: false,
  prefix: '_',
  excludePrefix: true,
  serverUrl: undefined,
  eventType: 'update-tokens',
  accessToken: undefined,
  acceptHeader: 'application/vnd.github.everest-preview+json',
  authType: 'token',
  keyInName: true,
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

export const settingsReducer = (draft, action) => {
  switch (action.type) {
    case 'reset':
      return initialSettings
    case 'load': {
      return action.payload
    }
    case 'update': {
      draft[action.fieldName] = action.payload
    }
  }
}
