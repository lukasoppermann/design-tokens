const StyleDictionaryModule = require('style-dictionary')

const StyleDictionary = StyleDictionaryModule.default || StyleDictionaryModule
const probe = new StyleDictionary({})

const adaptTransform = (transform) => ({
  type: transform.type,
  filter: transform.matcher || transform.filter,
  transform: transform.transformer || transform.transform
})

module.exports = {
  hooks: {
    transforms: {
      'size/px': adaptTransform(require('./sizePx')),
      'web/shadow': adaptTransform(require('./webShadows')),
      'web/radius': adaptTransform(require('./webRadius')),
      'web/padding': adaptTransform(require('./webPadding')),
      'web/font': adaptTransform(require('./webFont')),
      'web/gradient': adaptTransform(require('./webGradient')),
      'color/hex8ToRgba': adaptTransform(require('../common/colorToRgbaString'))
    },
    transformGroups: {
      'custom/css': probe.hooks.transformGroups.css
        .filter(transformName => transformName !== 'size/rem')
        .concat([
        'size/px',
        'web/shadow',
        'web/radius',
        'web/padding',
        'web/font',
        'web/gradient',
        'color/hex8ToRgba'
        ])
    },
    formats: {
      'custom/css': require('./formatCss')
    },
    actions: {}
  }
}
