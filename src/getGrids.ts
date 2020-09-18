const getGrids = () => {
  // get styles
  const gridStyles = figma.getLocalGridStyles()
  // transform styles
  return gridStyles.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    grids: item.layoutGrids
  }))

}

export default getGrids