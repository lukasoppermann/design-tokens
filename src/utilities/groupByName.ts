import { propertyObject } from '@typings/propertyObject'
import deepMerge from './deepMerge'
import transformName from '../utilities/transformName'
import { Settings } from '@typings/settings'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => {
  // reducer
  const reducer = (val, key) => ({ [key]: val })
  // return reduced array
  return array.reduceRight(reducer, value)
}

export const groupByKeyAndName = (tokenArray: propertyObject[], userSettings: Settings) => {
  const removeName: boolean = true
  // guard
  if (tokenArray.length <= 0) return []
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // remove top level prefix to name if desired
    if (userSettings.prefixInName === false) {
      console.log(token.name, ' // ', token.name.substr(token.name.indexOf('/') + 1).trim().trimLeft())
      token.name = token.name.substr(token.name.indexOf('/') + 1).trim().trimLeft()
    }
    // add key to name if desired
    if (userSettings.keyInName) {
      token.name = `${token.exportKey}/${token.name}`
    }
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groupsFromName = token.name.split('/').map(group => transformName(group, userSettings.nameConversion))
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
