module.exports = {
  hooks: {
    transforms: {},
    formats: {},
    actions: {
      'ios/colorSets': require('./colorsets'),
      'ios/fontStyles': require('./fontStyles')
    }
  }
}
