module.exports = {
  type: 'value',
  matcher: function (token) {
    return token.type === 'custom-fontStyle'
  },
  transformer: function (token) {
    return `${token.value.fontSize}sp`
  }
}
