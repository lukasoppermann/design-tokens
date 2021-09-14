const notDefault = (value, defaultValue) => (value !== defaultValue) ? value : ''

module.exports = {
  type: 'attribute',
  matcher: function (token) {
    console.log(token)
    return token.type === 'custom-fontStyle'
  },
  transformer: function (token) {
    console.log(token)
    // font: font-style font-variant font-weight font-size/line-height font-family;
    // return `${notDefault(font.fontStretch, 'normal')} ${notDefault(font.fontStyle, 'normal')} ${font.fontWeight} ${font.fontSize}/${font.lineHeight} ${options.fontFamilies[font.fontFamily] ? options.fontFamilies[font.fontFamily] : font.fontFamily}`.trim()
  }
}
