const StyleDictionaryModule = require('style-dictionary')

const StyleDictionary = StyleDictionaryModule.default || StyleDictionaryModule
const probe = new StyleDictionary({})

const adaptTransform = (transform) => ({
  type: transform.type,
  filter: transform.matcher || transform.filter,
  transform: transform.transformer || transform.transform
})

const StyleDictionaryExtended = new StyleDictionary({
  source: ['./tests/files/standard-tokens.json'],
  hooks: {
    transforms: {
      'size/px': adaptTransform(require('./libs/standard/web/sizePx')),
      'web/shadow': adaptTransform(require('./libs/standard/web/webShadows')),
      'web/radius': adaptTransform(require('./libs/standard/web/webRadius')),
      'web/padding': adaptTransform(require('./libs/standard/web/webPadding')),
      'web/font': adaptTransform(require('./libs/standard/web/webFont')),
      'web/gradient': adaptTransform(require('./libs/standard/web/webGradient')),
      'color/hex8ToRgba': adaptTransform(require('./libs/standard/web/colorToRgbaString'))
    },
    formats: {
      css: require('./libs/standard/web/formatWeb')
    }
  },
  platforms: {
    css: {
      transforms: probe.hooks.transformGroups.css
        .filter(transformName => transformName !== 'size/rem')
        .concat([
          'size/px',
          'web/shadow',
          'web/radius',
          'web/padding',
          'web/font',
          'web/gradient',
          'color/hex8ToRgba'
        ]),
      buildPath: './tests/integration/data/',
      files: [
        {
          destination: 'standard.variables.css',
          format: 'css',
          options: {
            showFileHeader: false
          }
        }
      ]
    }
  }
})

StyleDictionaryExtended.buildAllPlatforms()
