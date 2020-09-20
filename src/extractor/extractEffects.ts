import groupByName from '../utilities/groupByName'

const getEffects = () => {
  // get effect styles
  const effectStyles = figma.getLocalEffectStyles().map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    values: {
      effects: item.effects
    }
  }))
  // return as object
  return groupByName(effectStyles)
}

export default getEffects