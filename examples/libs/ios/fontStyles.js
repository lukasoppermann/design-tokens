const fs = require('fs-extra')
const camelCase = require('../common/camelCaseHelper')
const fontStyleTemplate = require('./fontStyleTemplate')

const fontFile = ({ fontFamily, fontWeight }, fontOpts) => {
  return fontOpts && fontOpts[`${fontFamily}.${fontWeight}`] ? fontOpts[`${fontFamily}.${fontWeight}`] : fontFamily
}

/**
 * This action will iterate over all the colors in the Style Dictionary
 * and for each one write a colorset with light and (optional) dark
 * mode versions.
 */
module.exports = {
  // This is going to run once per theme.
  do: (dictionary, platform) => {
    const assetPath = `${platform.buildPath}`
    fs.ensureDirSync(assetPath)

    const fontStyles = {
      filename: 'StyleDictionary+Generated.swift',
      class: 'StyleDictionary',
      font: [],
      lineheight: [],
      leading: []
    }
    // cycle through all tokens
    dictionary.allTokens
      // filter out custom styles
      .filter(token => token.type === 'custom-fontStyle')
      // remove all underline styles (they can not be used like this in iOS)
      .filter(token => token.original.value.textDecoration !== 'underline')
      // split int 2 parts: font & fontSize, lineheight, leading
      .forEach(({ original: { value }, path }) => {
        // chaning name & removeing "font" from name for better DX
        const name = camelCase(path.slice(1).join(' '))
        // lineheight
        fontStyles.lineheight.push(`public static let ${name} = ${(value.lineHeight / value.fontSize).toFixed(2)}`)
        // leading
        fontStyles.leading.push(`public static let ${name} = ${(1 + value.letterSpacing / value.fontSize).toFixed(2)}`)
        // font style
        fontStyles.font.push(`public static let ${name} = UIFontMetrics.default.scaledFont(for: UIFont(name: "${fontFile(value, platform.options.fontFamilies)}", size: ${value.fontSize})!)`)
      })
    // write .swift file with definitions for defaults
    fs.writeFileSync(`${assetPath}/${fontStyles.filename}`, fontStyleTemplate(fontStyles))
  },
  undo: function (dictionary, platform) {
    // no undo
  }
}
