const camelCase = require('../common/camelCaseHelper')

module.exports = {
  type: 'name',
  matcher: function (token) {
    return token.type === 'color'
  },
  transformer: function (token) {
    return camelCase(token.path.slice(2).join(' '))
  }
}
