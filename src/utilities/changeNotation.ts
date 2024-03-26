import transformName from './transformName'

export const changeNotation = (name: string, currentDelimiter = '/', desiredDelimiter = '.', nameConversion: string = 'default') => {
  return name.split(currentDelimiter).map(group => transformName(group, nameConversion)).join(desiredDelimiter).toLowerCase()
}
