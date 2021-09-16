const fs = require('fs-extra')

const filename = 'StyleDictionary+Generated.swift'
const dateNow = () => {
  return new Date().toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

const fontFile = ({ fontFamily, fontWeight }, fontOpts) => {
  return fontOpts && fontOpts[`${fontFamily}.${fontWeight}`] ? fontOpts[`${fontFamily}.${fontWeight}`] : fontFamily
}

const buildFile = content => `
//
//  ${filename}
//
//  Created by Design Token Generator on ${dateNow()}.
//

import UIKit

public class StyleDictionaryFont {

${content}

}
`

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

    const font = []
    const lineheight = []
    const leading = []

    dictionary.allTokens
      .filter(token => token.type === 'custom-fontStyle')
      .forEach(({ name, original: { value } }) => {
        // lineheight
        lineheight.push(`public static let ${name} = ${value.lineHeight / value.fontSize}`)
        // leading
        leading.push(`public static let ${name} = ${1 + value.letterSpacing / value.fontSize}`)
        // font style
        font.push(`public static let ${name} = UIFontMetrics.default.scaledFont(for: UIFont(name: "${fontFile(value, platform.options.fontFamilies)}", size: ${value.fontSize})!)`)
      })

    const content =
`  enum Fonts {
    ${font.join('\n    ')}
  }

  enum LineHeight {
    ${lineheight.join('\n    ')}
  }

  enum LineHeight {
    ${leading.join('\n    ')}
  }`

    fs.writeFileSync(`${assetPath}/${filename}`, buildFile(content))
  },
  undo: function (dictionary, platform) {
    // no undo
  }
}
