/* eslint-disable @typescript-eslint/no-var-requires */
const deepMerge = require('deepmerge')
const androidConfig = require('./libs/android')
const iosConfig = require('./libs/ios')
const webConfig = require('./libs/web')
const StyleDictionaryModule = require('style-dictionary')

const StyleDictionary = StyleDictionaryModule.default || StyleDictionaryModule

// PATHS
const basePath = './examples/'
const buildPath = basePath + 'build/'

const main = async () => {
  const StyleDictionaryExtended = new StyleDictionary({
    // adding imported configs
    ...deepMerge.all([androidConfig, iosConfig, webConfig]),
    source: [basePath + 'input/*.json'],
    platforms: {
      css: {
        transformGroup: 'custom/css',
        buildPath: buildPath + '/css/',
        options: {
          fontFamilies: {
            'Akzidenz-Grotesk Pro': '"Akzidenz-Grotesk Pro", sans-serif'
          }
        },
        files: [
          {
            filter: require('./libs/web/filterWeb'),
            format: 'custom/css',
            destination: 'variables.css'
          }
        ]
      },
      scss: {
        transformGroup: 'custom/css',
        buildPath: buildPath + '/scss/',
        files: [
          {
            filter: require('./libs/web/filterWeb'),
            format: 'scss/variables',
            destination: 'variables.scss'
          }
        ]
      },
      'ios-swift': {
        transforms: [
          'name/camel'
        ],
        buildPath: buildPath + 'ios/',
        options: {
          fontFamilies: {
            'Akzidenz-Grotesk Pro.700': 'AkzidenzGroteskPro_Bold',
            'Akzidenz-Grotesk Pro.900': 'AkzidenzGroteskPro_Black'
          }
        },
        files: [
          {
            destination: 'Size.swift',
            filter: (token) => token.type === 'dimension',
            format: 'ios-swift/class.swift',
            options: {
              className: 'Size'
            }
          }
        ],
        actions: [
          'ios/colorSets',
          'ios/fontStyles'
        ]
      },
      android: {
        transforms: [
          'name/camel',
          'android/colorName',
          'android/fontSize',
          'android/pxToDp',
          'android/color'
        ],
        buildPath: buildPath + 'android/',
        options: {
          copyFilesAction: [
            {
              destination: buildPath + 'android/font/font_family.xml',
              origin: basePath + 'filesToCopy/font_family.xml'
            }
          ]
        },
        files: [
          {
            destination: 'values/font_styles.xml',
            format: 'android/fontStyle',
            filter: (token) => token.type === 'custom-fontStyle',
            options: {
              fontFamilies: {
                'Akzidenz-Grotesk Pro': '@font/AkzidenzGroteskPro'
              }
            }
          },
          {
            destination: 'values/dimens.xml',
            format: 'android/resources',
            options: {
              resourceType: 'dimen'
            },
            filter: (token) => token.type === 'dimension' || token.type === 'custom-fontStyle'
          },
        {
          destination: 'values/colors.xml',
          format: 'android/resourcesSorted',
          resourceType: 'color',
          filter: (token) => {
            return token.type === 'color' && token.path[1]?.toLowerCase() === 'light'
          }
        },
        {
          destination: 'values-night/colors.xml',
          format: 'android/resourcesSorted',
          resourceType: 'color',
          filter: (token) => {
            return token.type === 'color' && token.path[1]?.toLowerCase() === 'dark'
          }
        }
        ],
        actions: ['copy_fileOrFolder']
      }
    }
  })

  await StyleDictionaryExtended.hasInitialized
  await StyleDictionaryExtended.buildAllPlatforms()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
