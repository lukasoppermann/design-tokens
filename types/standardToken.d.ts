export type customTokenTypes = 'custom-spacing' |
'custom-radius' |
'custom-fontStyle' |
'custom-shadow' |
'custom-transition' |
'custom-stroke' |
'custom-grid' |
'custom-gradient' |
'custom-opacity'

export type StandardTokenTypes = 'string' |
'number' |
'object' |
'array' |
'boolean' |
'null' |
'color' |
'dimension' |
'font' |
customTokenTypes

export type StandardTokenValueType = string | number | Array<any> | Object | Boolean | null

export type StandardCompositeTokenValueType = {
  [key: string]: StandardTokenValueType,
}

export type StandardTokenGroup = {
  [name: string]: {
    description?: string
    [name: string | number]: StandardTokenDataInterface | string
  }
}

export type pluginExtensionKey = 'org.lukasoppermann.figmaDesignTokens'

export type StandardTokenExtensionsInterface = {
  [key: string | pluginExtensionKey]: any | {
    styleId?: string,
    exportKey?: string,
    category?: string,
    group?: string,
    unit?: string,
  }
}

export type StandardTokenDataInterface = {
  description?: string,
  value: StandardTokenValueType | StandardCompositeTokenValueType,
  type: StandardTokenTypes,
  extensions?: StandardTokenExtensionsInterface
}

export type StandardTokenInterface = {
  name: string
} & StandardTokenDataInterface
