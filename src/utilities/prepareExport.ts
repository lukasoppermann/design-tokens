import { internalTokenInterface } from '@typings/propertyObject'
import { Settings } from '@typings/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { transformer as standardTransformer } from '@src/transformer/standardTransformer'
import { groupByKeyAndName } from '@utils/groupByName'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'
import { prefixTokenName } from '@utils/prefixTokenName'
import { defaultSettings } from '@config/defaultSettings'

const tokenTransformer = {
  original: originalFormatTransformer,
  standard: standardTransformer,
  standardDeprecated: standardTransformer
}

const createTypographyTokens = (tokens: internalTokenInterface[], settings) => {
  if (settings.tokenFormat === 'standard') {
    return JSON.parse(JSON.stringify(tokens.filter(item => item.category === tokenTypes.font.key)))
      .map(item => {
        item.name = 'typography/' + item.name.substr(item.name.indexOf('/') + 1).trim().trimStart()
        item.category = tokenTypes.typography.key as tokenCategoryType
        item.exportKey = tokenTypes.typography.key as tokenExportKeyType
        if (settings.excludeExtensionProp !== true) {
          item.extensions[config.key.extensionPluginData] = {
            ...item.extensions[config.key.extensionPluginData],
            exportKey: tokenTypes.typography.key as tokenCategoryType
          }
        }
        return item
      })
  }
  return []
}

export const prepareExport = (tokens: string, settings: Settings) => {
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
    prefix: {
      ...defaultSettings.prefix,
      ...settings.prefix
    },
    exports: {
      ...defaultSettings.exports,
      ...settings.exports
    }
  }
  if ((mergedSettings.tokenFormat as string) === 'w3c') {
    mergedSettings.tokenFormat = 'standard'
  }
  if (tokens.length === 0) tokens = '[]'
  // parse json string
  let tokenArray: internalTokenInterface[] = JSON.parse(tokens)
  const exportKeyCounts = tokenArray.reduce((counts, token) => {
    counts[token.exportKey] = (counts[token.exportKey] || 0) + 1
    return counts
  }, {})
  // duplicate font if typography is true && format = standard
  tokenArray = [...tokenArray, ...createTypographyTokens(tokenArray, mergedSettings)]
  // filter by user setting for export keys
  const tokensFiltered: internalTokenInterface[] = tokenArray.filter(({ exportKey }) => mergedSettings.exports[exportKey])
  // add to name
  const prefixedTokens = prefixTokenName(tokensFiltered, mergedSettings)
  // converted values
  const tokensConverted = prefixedTokens.map(token => tokenTransformer[mergedSettings.tokenFormat]?.(token, mergedSettings)).filter(Boolean)
  console.log('[Design Tokens] prepareExport summary', {
    tokenFormat: mergedSettings.tokenFormat,
    rawCount: tokenArray.length,
    exportKeyCounts,
    enabledExports: mergedSettings.exports,
    filteredCount: tokensFiltered.length,
    convertedCount: tokensConverted.length
  })
  // group items by their names
  // @ts-ignore
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, mergedSettings)
  // return tokens
  return tokensGroupedByName
}
