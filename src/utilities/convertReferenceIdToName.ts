const convertReferenceIdToName = (refrenceId: string): string => {
  if (refrenceId !== undefined) {
    const style = figma.getStyleById(refrenceId)
    console.log(style, style.name.trim().toLowerCase().replace(/\s*\/\s*/, '.'))
   // ...(property.type === "reference" && { comment: `Referencing style / desing token: ` }),
   // also add comment with referenced name
    return `{${style.name.trim().toLowerCase().replace(/\s*\/\s*/, '.')}}`
  }
  return
}
export default convertReferenceIdToName