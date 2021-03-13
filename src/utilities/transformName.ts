const toCamelCase = (string: string): string => {
  return string.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/([-_ ]){1,}/g, ' ')
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ (.)/g, function ($1) { return $1.toUpperCase() })
    .replace(/ /g, '')
}

const toKebabCase = (string: string): string => {
  return string.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/([-_ ]){1,}/g, ' ')
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ /g, '-')
}

const transformName = (name: string, nameConversion: string = 'default'): string => {
  // if camelCase
  if (nameConversion === 'camelCase') {
    return toCamelCase(name)
  }
  // if kebabCase
  if (nameConversion === 'kebabCase') {
    return toKebabCase(name)
  }
  return name.trim().toLowerCase()
}

export default transformName
export const __testing = {
  toCamelCase: toCamelCase,
  toKebabCase: toKebabCase
}
