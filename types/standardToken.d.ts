export type StandardTokenTypes = 'string' |
'number' |
'object' |
'array' |
'boolean' |
'null' |
'color' |
'dimension' |
'font'

export type StandardTokenInterface = {
  name: string,
  value: string | number | Array<any> | Object | Boolean | null,
  type: StandardTokenTypes,
  description?: string,
  vendor?: {
    [key: string]: any
  },
  data: {
    exportKey: string,
    category: string,
    group?: string,
    unit?: string,
  }
}
