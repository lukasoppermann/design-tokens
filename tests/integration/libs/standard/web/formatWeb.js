const printDescription = description => description && description.length > 0 ? ` /* ${description} */` : ''

const formatTokens = (dictionary) =>
  dictionary.allTokens.map(({ name, value, description }) => {
    return `  --${name}: ${value};${printDescription(description)}`
  }).join('\n')

module.exports = ({ dictionary, options, file }) => {
  return (
    ':root {\n' +
      formatTokens(dictionary) +
    '\n}\n'
  )
}
