import * as React from 'react'
import { Settings } from '../../../types/settings'

export const SettingsContext = React.createContext(null)

export const initialState: Settings = {
  filename: 'design-tokens',
  nameConversion: 'default',
  compression: false,
  prefix: '_',
  excludePrefix: true,
  serverUrl: undefined,
  eventType: 'update-tokens',
  accessToken: undefined,
  acceptHeader: 'application/vnd.github.everest-preview+json',
  authType: 'token'
}

export const settingsReducer = (draft, action) => {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'load': {
      return action.payload
    }
    case 'update': {
      draft[action.fieldName] = action.payload
    }
  }
}
