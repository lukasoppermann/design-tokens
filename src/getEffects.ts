const getEffects = () => {
  // get effect styles
  const effectStyles = figma.getLocalEffectStyles().map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    effects: item.effects
  }))
  // return as object
  return {
    effects: effectStyles
  }
}

export default getEffects