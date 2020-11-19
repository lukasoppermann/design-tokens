import { EffectStyleObject } from '../../types/styles'

/**
 * @function getEffectStyles
 * @param {Array<EffectStyle>} styles – the effectStyle from the figma file
 */
const getEffectStyles = (styles: EffectStyle[]): EffectStyleObject[] => {
  // init styleArray
  const styleArray = []
  // loop through Figma styles and add to array
  styles.forEach(style => {
    styleArray.push({
      name: style.name,
      description: style.description,
      effects: style.effects
    })
  })
  // return array
  return styleArray
}

export default getEffectStyles
