const StyleDictionary = require('style-dictionary')

const StyleDictionaryExtended = StyleDictionary.extend({
  parsers: [{
    pattern: /\.json$/,
    parse: ({ filePath, contents }) => {
      contents = contents
        .replace(/"\$value":/g, '"value":')
        .replace(/"\$type":/g, '"type":')
        .replace(/"\$description":/g, '"description":')
        .replace(/"\$extension":/g, '"extension":')
      return JSON.parse(contents)
    }
  }],
  source: ['./tests/files/standard-tokens.json'],
  transform: {
    'size/px': require('./libs/standard/web/sizePx'),
    'web/shadow': require('./libs/standard/web/webShadows'),
    'web/radius': require('./libs/standard/web/webRadius'),
    'web/padding': require('./libs/standard/web/webPadding'),
    'web/font': require('./libs/standard/web/webFont'),
    'web/gradient': require('./libs/standard/web/webGradient'),
    'color/hex8ToRgba': require('./libs/standard/web/colorToRgbaString')
  },
  format: {
    css: require('./libs/standard/web/formatWeb')
  },
  platforms: {
    css: {
      transforms: StyleDictionary.transformGroup.css.concat([
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
