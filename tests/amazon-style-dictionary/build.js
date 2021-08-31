/* eslint-disable @typescript-eslint/no-var-requires */
const StyleDictionary = require('style-dictionary')
const { fileHeader } = StyleDictionary.formatHelpers
const changeCase = require('change-case')

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: function (token) {
    return token.data.unit === 'pixel' && token.value !== 0
  },
  transformer: function (token) {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: function (token) {
    return token.data.unit === 'percent' && token.value !== 0
  },
  transformer: function (token) {
    return `${token.value}%`
  }
})

StyleDictionary.registerTransform({
  name: 'font/family',
  type: 'value',
  matcher: function (token) {
    return token.type === 'font'
  },
  transformer: function (token) {
    return `"${token.value}"`
  }
})

StyleDictionary.registerTransform({
  name: 'android/color',
  type: 'value',
  matcher: function (token) {
    return token.category === 'color'
  },
  transformer: function (token) {
    // return `#${rgbToHex(token.value)}`
    return token.value
  }
})

StyleDictionary.registerTransform({
  name: 'android/pxToDp',
  type: 'value',
  matcher: function (token) {
    return token.type === 'dimension' && token.data.category !== 'font'
  },
  transformer: function (token) {
    return `${token.value}dp`
  }
})

StyleDictionary.registerTransform({
  name: 'android/fontSizes',
  type: 'value',
  matcher: function (token) {
    return token.type === 'dimension' && token.data.category === 'font'
  },
  transformer: function (token) {
    return `${token.value}sp`
  }
})

// it is recommended to use a font defition like the one below for android
// <?xml version="1.0" encoding="utf-8"?>
// <font-family xmlns:android="http://schemas.android.com/apk/res/android">
//     <font
//         android:fontStyle="normal"
//         android:fontWeight="400"
//         android:font="@font/lobster_regular" />
//     <font
//         android:fontStyle="italic"
//         android:fontWeight="400"
//         android:font="@font/lobster_italic" />
// </font-family>

StyleDictionary.registerFormat({
  name: 'android/fontStyle',
  formatter: function ({ dictionary, platform, options = {}, file }) {
    console.dir(Object.entries(dictionary.properties), { depth: null })
    const fontStyles = Object.entries(dictionary.properties).map(([key, group]) => {
      return `  <style name="${changeCase.camelCase(key, { transform: changeCase.camelCaseTransformMerge })}">\n` +
    `    <item name="android:fontFamily">${options.fontFamilies[group.fontFamily.value]}</item>\n` +
    `    <item name="android:textSize">@dimen/${group.fontSize.name}</item>\n` +
    `    <item name="fontStyle">${group.fontStyle.value}</item>\n` +
    `    <item name="fontWeight">${group.fontWeight.value}</item>\n` +
    '  </style>\n'
    })
    return (
      '<?xml version="1.0" encoding="utf-8"?>\n' +
      fileHeader({ file, commentStyle: 'xml' }) +
      '\n<resources>\n' +
        fontStyles.join('\n') +
       '\n</resources>\n'
    )
  }
})

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup.css.concat([
    'size/px',
    'font/family',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/android',
  transforms: [
    'name/cti/snake',
    'android/fontSizes',
    'android/pxToDp',
    'android/color'
  ]
})

const buildPath = './tests/amazon-style-dictionary/build/'

const StyleDictionaryExtended = StyleDictionary.extend({
  source: ['./tests/files/*.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: buildPath,
      files: [
        {
          format: 'css/variables',
          destination: 'variables.css'
        }
      ]
    },
    scss: {
      transformGroup: 'custom/css',
      buildPath: buildPath,
      files: [
        {
          format: 'scss/variables',
          destination: 'variables.scss'
        }
      ]
    },
    less: {
      transformGroup: 'custom/css',
      buildPath: buildPath,
      files: [
        {
          format: 'less/variables',
          destination: 'variables.less'
        }
      ]
    },
    'ios-swift': {
      transformGroup: 'ios-swift',
      buildPath: buildPath,
      files: [
        {
          format: 'ios-swift/class.swift',
          className: 'StyleDictionary',
          destination: 'variables.swift'
        }
      ]
    },
    android: {
      transformGroup: 'custom/android',
      buildPath: buildPath,
      files: [
        {
          destination: 'style_dictionary_font_dimens.xml',
          format: 'android/resources',
          resourceType: 'dimen',
          filter: (prop) => prop.type === 'dimension' && prop.data.category === 'font'
        },
        {
          destination: 'style_dictionary_font_styles.xml',
          format: 'android/fontStyle',
          filter: (prop) => prop.data.category === 'font',
          options: {
            fontFamilies: {
              Helvetica: '@font/helvetica'
            }
          }
        },
        {
          destination: 'style_dictionary_dimens.xml',
          format: 'android/resources',
          resourceType: 'dimen',
          filter: (prop) => (prop.type === 'dimension' && prop.data.category !== 'font')
        },
        {
          destination: 'style_dictionary_colors.xml',
          format: 'android/resources',
          resourceType: 'color',
          filter: (prop) => prop.type === 'color'
        }
      ]
    }
  }
})

StyleDictionaryExtended.buildAllPlatforms()
