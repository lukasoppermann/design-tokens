export const getVariableTypeByValue = (value: string | number | boolean | object) => {
  if (typeof value === 'boolean') return 'string'
  if (typeof value === 'number') return 'dimension'
  if (typeof value === 'object') return 'color'
  if (typeof value === 'string') return 'string'
}
