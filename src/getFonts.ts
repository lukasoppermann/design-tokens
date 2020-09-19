const getFonts = () => {
  // get raw text styles
  const textStyles = figma.getLocalTextStyles().map(item => ({
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
  // return as object
  return {
    fonts: textStyles
  }

}

export default getFonts