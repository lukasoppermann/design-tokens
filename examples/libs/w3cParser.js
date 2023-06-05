module.exports = {
  pattern: /\.json$/,
  parse: ({ filePath, contents }) => {
    contents = contents
      .replace(/"\$value":/g, '"value":')
      .replace(/"\$type":/g, '"type":')
      .replace(/"\$description":/g, '"description":')
      .replace(/"\$extension":/g, '"extension":')
    return JSON.parse(contents)
  }
}
