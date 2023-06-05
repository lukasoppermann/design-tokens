import type { BlendType } from './valueTypes'

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
  'gradient' |
  'dimension' |
  'font' |
  'fontFamily' |
  'fontWeight' |
  'shadow' |
  'typography' |
  'border' |
  'transition' |
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

export type StandardDeprecatedTokenDataInterface = {
  description?: string,
  value: StandardTokenValueType | StandardCompositeTokenValueType,
  type: StandardTokenTypes,
  blendMode?: BlendType,
  extensions?: StandardTokenExtensionsInterface
}

export type StandardTokenDataInterface = {
  $description?: string,
  $value: StandardTokenValueType | StandardCompositeTokenValueType,
  $type: StandardTokenTypes,
  $extensions?: StandardTokenExtensionsInterface
  blendMode?: BlendType,
}

export type StandardTokenInterfaceV2 = {
  name: string
} & StandardTokenDataInterface

export type StandardTokenInterfaceV1 = {
  name: string
} & StandardDeprecatedTokenDataInterface
