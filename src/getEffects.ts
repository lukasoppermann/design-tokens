const getEffects = () => {
  // get styles
  const effectStyles = figma.getLocalEffectStyles()
  // transform styles
  return effectStyles.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    effects: item.effects
  }))

}

export default getEffects