import config from '@config/config'

type objectWithNameProperty = {
  name: string,
  [key: string]: any
}

const exclusionPrefix = (exclusionPrefixStrings: string[]): string[] => {
  return [
    ...config.exclusionPrefixDefault,
    ...exclusionPrefixStrings
  ]
}

const filterByPropertyName = (object: objectWithNameProperty, exclusionPrefixStrings: string[]) => !exclusionPrefix(exclusionPrefixStrings).includes(object.name.trim().substr(0, 1))

export default filterByPropertyName
