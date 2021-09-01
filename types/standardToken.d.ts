export type StandardTokenTypes = 'string' |
'number' |
'object' |
'array' |
'boolean' |
'null' |
'color' |
'dimension' |
'font'

export type StandardTokenValuesInterface = {
  value: string | number | Array<any> | Object | Boolean | null,
  type: StandardTokenTypes,
  extensions?: {
    [key: string]: any
  },
  data: {
    exportKey: string,
    category: string,
    group?: string,
    unit?: string,
  }
}

export type StandardTokenInterface = {
  [name: string]: {
    description?: string,
  } & (StandardTokenValuesInterface | {[key: string]: StandardTokenValuesInterface})
}
