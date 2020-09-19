const getGrids = () => {
  // get grid styles
  const gridStyles = figma.getLocalGridStyles().map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    grids: item.layoutGrids
  }))
  // return as object
  return {
    grids: gridStyles
  }
}

export default getGrids