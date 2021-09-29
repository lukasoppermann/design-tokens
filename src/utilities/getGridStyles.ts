import { GridStyleObject } from '@typings/styles'

/**
 * @function getGridStyles
 * @param {Array} gridStyles – the gridStyles from the figma file
 */
const getGridStyles = (styles: GridStyle[]): GridStyleObject[] => {
  // init styleArray
  const styleArray = []
  // loop through Figma styles and add to array
  styles.forEach(style => {
    styleArray.push({
      name: style.name,
      id: style.id,
      description: style.description,
      layoutGrids: style.layoutGrids
    })
  })
  // return array
  return styleArray
}

export default getGridStyles
