const adaptTransform = (transform) => ({
  type: transform.type,
  filter: transform.matcher || transform.filter,
  transform: transform.transformer || transform.transform
})

module.exports = {
  hooks: {
    transforms: {
      'android/pxToDp': adaptTransform(require('./pxToDp')),
      'android/color': adaptTransform(require('../common/colorToHex8')),
      'android/fontSize': adaptTransform(require('./fontSizeToSp')),
      'android/colorName': adaptTransform(require('./colorName'))
    },
    actions: {
      copy_fileOrFolder: require('../common/copyFileOrFolder')
    },
    formats: {
      'android/resourcesSorted': require('./formatResourcesSorted'),
      'android/fontStyle': require('./formatFontStyle')
    }
  }
}
