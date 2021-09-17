const fs = require('fs-extra')
const changeCase = require('change-case')
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
      tv: {
        filename: 'StyleDictionaryTv+Generated.swift',
        class: 'StyleDictionaryTv',
        font: [],
        lineheight: [],
        leading: []
      },
      interface: {
        filename: 'StyleDictionary+Generated.swift',
        class: 'StyleDictionary',
        font: [],
        lineheight: [],
        leading: []
      }
    }
    // cycle through all tokens
    dictionary.allTokens
      // filter out custom styles
      .filter(token => token.type === 'custom-fontStyle')
      // remove all underline styles (they can not be used like this in iOS)
      .filter(token => token.original.value.textDecoration !== 'underline')
      // split int 2 parts: font & fontSize, lineheight, leading
      .forEach(({ original: { value }, path }) => {
        const name = changeCase.pascalCase(path.slice(2).join(' '))
        // lineheight
        fontStyles[path[1]].lineheight.push(`public static let ${name} = ${(value.lineHeight / value.fontSize).toFixed(2)}`)
        // leading
        fontStyles[path[1]].leading.push(`public static let ${name} = ${(1 + value.letterSpacing / value.fontSize).toFixed(2)}`)
        // font style
        fontStyles[path[1]].font.push(`public static let ${name} = UIFontMetrics.default.scaledFont(for: UIFont(name: "${fontFile(value, platform.options.fontFamilies)}", size: ${value.fontSize})!)`)
      })
    // write .swift file with definitions for defaults
    fs.writeFileSync(`${assetPath}/${fontStyles.interface.filename}`, fontStyleTemplate(fontStyles.interface))
    // write .swift file with definitions for tv
    fs.writeFileSync(`${assetPath}/${fontStyles.tv.filename}`, fontStyleTemplate(fontStyles.tv))
  },
  undo: function (dictionary, platform) {
    // no undo
  }
}
