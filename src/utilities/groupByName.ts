import deepMerge from './deepMerge'
import transformName from '../utilities/transformName'
import { Settings } from '@typings/settings'
import { OriginalFormatTokenInterface } from '@typings/originalFormatProperties'
import { StandardTokenInterface } from '@typings/standardToken'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => {
  // reducer
  const reducer = (val, key) => ({ [key]: val })
  // return reduced array
  return array.reduceRight(reducer, value)
}

export const groupByKeyAndName = (tokenArray: OriginalFormatTokenInterface[] | StandardTokenInterface[], userSettings: Settings) => {
  const removeName = true
  // guard
  if (tokenArray.length <= 0) return []
  // nest tokens into object with hierarchy defined by name using /
  const groupedTokens = tokenArray.map(token => {
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
  // return merged object of tokens grouped by name hierarchy
  return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))
}
