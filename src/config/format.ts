/* istanbul ignore file */
export type formatKeysType = {
  VALUE: '$value' | 'value',
  DESCRIPTION: '$description' | 'description',
  TYPE: '$type' | 'type',
  EXTENSIONS: '$extensions' | 'extensions',
  NAME: 'name'
}

export const formatKeys: {
  standardDeprecated: formatKeysType,
  standard: formatKeysType
} = {
  standardDeprecated: {
    VALUE: 'value',
    DESCRIPTION: 'description',
    TYPE: 'type',
    EXTENSIONS: 'extensions',
    NAME: 'name'
  },
  standard: {
    VALUE: '$value',
    DESCRIPTION: '$description',
    TYPE: '$type',
    EXTENSIONS: '$extensions',
    NAME: 'name'
  }
}
