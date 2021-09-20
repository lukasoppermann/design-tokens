module.exports = {
  type: 'value',
  matcher: function (token) {
    return token.type === 'dimension'
  },
  transformer: function (token) {
    return `${token.value}dp`
  }
}
