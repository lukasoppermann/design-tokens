import { PropertyType } from './valueTypes'

export type StyleDictionaryPropertyObject = {
  value: string | number,
  type: PropertyType,
  unit?: string
  comment?: string,
}

export type StyleDictionaryPropertyGroup = {
  name: string,
  comment?: string,
} & {
  [key: string]: StyleDictionaryPropertyObject | any
}