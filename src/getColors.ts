const getColors = () => {
  const paintStyles = figma.getLocalPaintStyles()
  return paintStyles.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    paints: item.paints
  }))

}

export default getColors