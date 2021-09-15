import { PropertyType } from './valueTypes'

export type OriginalFormatPropertyObject = {
  value: string | number,
  type: PropertyType,
  unit?: string
  comment?: string,
}

export type OriginalFormatPropertyGroup = {
  name: string,
  exportKey: string,
  comment?: string,
} & {
  [key: string]: OriginalFormatPropertyObject | any
}

export type OriginalFormatTokenInterface = {
  name: string,
  exportKey: string,
  category: string,
  comment?: string,
} & {
  [key: string]: OriginalFormatPropertyObject | any
}
