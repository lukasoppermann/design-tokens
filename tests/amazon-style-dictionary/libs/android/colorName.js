const androidCamelCase = require('./helperAndroidCamelCase')

module.exports = {
  type: 'name',
  matcher: function (token) {
    return token.type === 'color'
  },
  transformer: function (token) {
    return androidCamelCase(token.path.slice(2).join(' '))
  }
}
