import { propertyObject } from '../../types/propertyObject'
import deepMerge from './deepMerge'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => {
  // reducer
  const reducer = (val, key) => ({ [key]: val })
  // return reduced array
  return array.reduceRight(reducer, value)
}

const groupByName = (tokenArray: propertyObject[], removeName: boolean = true) => {
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groupsFromName = token.name.split('/').map(group => group.trim().toLowerCase())
    // remove name if not otherwise specified
    if (removeName === true) {
      delete token.name
    }
    // return 
    return nestedObjectFromArray(groupsFromName, token)
  })
  
  if (groupedTokens.length > 0 ) {
    // return merged object of tokens grouped by name hierachy
    return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))
  }
  return []
}

export default groupByName