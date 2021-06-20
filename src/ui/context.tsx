import * as React from 'react'

export const FigmaContext = React.createContext(null)

export const SettingsContext = React.createContext(null)

export const settingsReducer = (draft, action) => {
  switch (action.type) {
    case 'load': {
      return action.payload
    }
    case 'update': {
      draft[action.fieldName] = action.payload
    }
  }
}
