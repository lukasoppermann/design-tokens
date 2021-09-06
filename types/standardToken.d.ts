export type StandardTokenTypes = 'string' |
'number' |
'object' |
'array' |
'boolean' |
'null' |
'color' |
'dimension' |
'font'

export type StandardTokenValueType = string | number | Array<any> | Object | Boolean | null

export type StandardCompositeTokenValueType = {
  [key: string]: string | number | Array<any> | Object | Boolean | null,
}

export type StandardTokenExtensionsInterface = {
  [key: string]: any
  'org.veare.figmaData': {
    exportKey: string,
    category: string,
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
  [name: string]: StandardTokenDataInterface
}
