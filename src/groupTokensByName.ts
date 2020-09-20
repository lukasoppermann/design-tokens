import deepMerge from './utilities/deepMerge'
// create a nested object structure from the array (['style','colors','main','red'])
const nestedObjectFromArray = (array: string[], value: any) => array.reduceRight((value, key) => ({[key]: value}), value)

const groupTokensByName = tokenArray => {
  // nest tokens into object with hierachy defined by name using /
  const groupedTokens = tokenArray.map(token => {
    // split token name into array
    // remove leading and following whitespace for every item
    // transform items to lowerCase
    const groups = token.name.split('/').map(group => group.trim().toLowerCase())
    // return 
    return nestedObjectFromArray(groups, token)
  })
  console.log(groupedTokens)
  const merged = groupedTokens.reduce((accumulator = {}, currentValue) => deepMerge(accumulator, currentValue))

  console.log(merged)

}

export default groupTokensByName