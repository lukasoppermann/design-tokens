const getColors = () => {
  // get all paint styles
  const paintStyles = figma.getLocalPaintStyles().map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    paints: item.paints
  }))
  // return as object
  return {
    colors: paintStyles
  }

}

export default getColors