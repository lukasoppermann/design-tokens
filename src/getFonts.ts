const getFonts = () => {
  const textStyles = figma.getLocalTextStyles()
  return textStyles.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    fontSize: item.fontSize,
    textDecoration: item.textDecoration,
    fontName: item.fontName,
    letterSpacing: item.letterSpacing,
    lineHeight: item.lineHeight,
    paragraphIndent: item.paragraphIndent,
    paragraphSpacing: item.paragraphSpacing,
    textCase: item.textCase
  }))

}

export default getFonts