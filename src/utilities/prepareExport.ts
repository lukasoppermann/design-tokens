import { internalTokenInterface } from '@typings/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { transformer as standardTransformer } from '@src/transformer/standardTransformer'
import { groupByKeyAndName } from '@utils/groupByName'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'
import { prefixTokenName } from './prefixTokenName'

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
          item.extensions[config.key.extensionPluginData].exportKey = tokenTypes.typography.key as tokenCategoryType
        }
        return item
      })
  }
  return []
}

export const prepareExport = (tokens: string, settings: Settings) => {
  if (tokens.length === 0) tokens = '{}'
  // parse json string
  let tokenArray: internalTokenInterface[] = JSON.parse(tokens)
  // duplicate font if typography is true && format = standard
  tokenArray = [...tokenArray, ...createTypographyTokens(tokenArray, settings)]
  // filter by user setting for export keys
  const tokensFiltered: internalTokenInterface[] = tokenArray.filter(({ exportKey }) => settings.exports[exportKey])
  // add to name
  const prefixedTokens = prefixTokenName(tokensFiltered, settings)
  // converted values
  const tokensConverted = prefixedTokens.map(token => tokenTransformer[settings.tokenFormat](token, settings)).filter(Boolean)
  // group items by their names
  // @ts-ignore
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, settings)
  // return tokens
  return tokensGroupedByName
}
