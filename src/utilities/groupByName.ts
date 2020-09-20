import deepMerge from './deepMerge'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => array.reduceRight((value, key) => ({[key]: value}), value)

const groupByName = tokenArray => {
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groupsFromName = token.name.split('/').map(group => group.trim().toLowerCase())
    // return 
    return nestedObjectFromArray(groupsFromName, token)
  })
  // return merged object of tokens grouped by name hierachy
  return groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))
}

export default groupByName