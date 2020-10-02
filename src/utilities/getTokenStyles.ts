import { BaseStyle } from '../../types/styles'

const excludeUnderscoreStyles = true

const getTokenStyles = (styles: BaseStyle[]): any[] => {
  if (excludeUnderscoreStyles === true) {
    return styles.filter(style => style.name.trim().substr(0, 1) !== '_')
  }
  return styles
}

export default getTokenStyles