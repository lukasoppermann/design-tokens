import { propertyObject } from '@typings/propertyObject'
import deepMerge from './deepMerge'
import transformName from '../utilities/transformName'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => {
  // reducer
  const reducer = (val, key) => ({ [key]: val })
  // return reduced array
  return array.reduceRight(reducer, value)
}

export const groupByName = (tokenArray: propertyObject[], removeName: boolean = true, nameConversion: string = 'default') => {
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groupsFromName = token.name.split('/').map(group => transformName(group, nameConversion))
    // remove name if not otherwise specified
    if (removeName === true) {
      delete token.name
    }
    // return
    return nestedObjectFromArray(groupsFromName, token)
  })

  if (groupedTokens.length > 0) {
    // return merged object of tokens grouped by name hierachy
    return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))
  }
  return []
}

export const groupByKeyAndName = (tokenArray: propertyObject[], includeKey: boolean = true, nameConversion: string = 'default') => {
  const removeName: boolean = true
  // guard
  if (tokenArray.length <= 0) return []
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // add key to name if desired
    if (includeKey) {
      token.name = `${token.exportKey}/${token.name}`
    }
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groupsFromName = token.name.split('/').map(group => transformName(group, nameConversion))
    // remove name if not otherwise specified
    if (removeName === true) {
      delete token.name
    }
    // return
    return nestedObjectFromArray(groupsFromName, token)
  })
  // return merged object of tokens grouped by name hierachy
  return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))
}
