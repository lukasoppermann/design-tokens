const { fileHeader } = require('style-dictionary').formatHelpers

const printDescription = description => (description && description !== '' && description !== null ? ` <!-- ${description} -->` : '')

module.exports = ({ dictionary, platform, options = {}, file }) => {
  const tokens = dictionary.allTokens
    .sort()
    // create style
    .map(token => `  <${file.resourceType} name="${token.name}">${token.value}</${file.resourceType}>${printDescription(token.description)};`)

  return (
    '<?xml version="1.0" encoding="utf-8"?>\n' +
      fileHeader({ file, commentStyle: 'xml' }) +
      '\n<resources>\n' +
        tokens.join('\n') +
      '\n</resources>\n'
  )
}
