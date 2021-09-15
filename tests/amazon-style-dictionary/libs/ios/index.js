const iOSColorSets = require('./colorsets')

module.exports = {
  transform: {
    'iOS/color': {
      type: 'value',
      matcher: function (token) {
        return token.type === 'color'
      },
      transformer: function (token) {
        return token.value
      }
    }
  },
  format: {},
  action: {
    'ios/colorSets': iOSColorSets
  }
}
