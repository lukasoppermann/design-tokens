const drawSquares = (count) => {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    const rect = figma.createRectangle();
    rect.x = i * 150;
    rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0.25}}];
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }
  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}

const tokenExport = () => {
  drawSquares(5)
  console.log(figma.getLocalPaintStyles()[0])
  console.log(figma.getStyleById(figma.getLocalPaintStyles()[0].id).name)
  console.log(figma.getLocalTextStyles())
  console.log(figma.getLocalEffectStyles())
  console.log(figma.getLocalGridStyles())
}

export default tokenExport