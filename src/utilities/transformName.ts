const returnOrThrow = (convertedString: string, originalString: string, stringCase: string): string => {
  // return converted string if successful
  if (typeof convertedString === 'string' && convertedString !== '') {
    return convertedString
  }
  // throw error
  throw new Error(`converting "${originalString}" to ${stringCase}, resulting in "${convertedString}"`)
}

const toCamelCase = (string: string): string => {
  const convertedString: string = string.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/([-_ ]){1,}/g, ' ')
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ (.)/g, function ($1) { return $1.toUpperCase() })
    .replace(/ /g, '')
  // return or throw
  return returnOrThrow(convertedString, string, 'camelCase')
}

const toKebabCase = (string: string): string => {
  const convertedString: string = string.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/([-_ ]){1,}/g, ' ')
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ /g, '-')
  // return or throw
  return returnOrThrow(convertedString, string, 'kebabCase')
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
