import { internalTokenInterface } from '@typings/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { standardTransformerV1 } from '@src/transformer/standardTransformerV1.deprecated'
import { standardTransformerV2 } from '@src/transformer/standardTransformerV2'
import { groupByKeyAndName } from '@utils/groupByName'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'
import { prefixTokenName } from './prefixTokenName'

const tokenTransformer = {
  original: originalFormatTransformer,
  standardDeprecated: standardTransformerV1,
  standard: standardTransformerV2
}

const createTypographyTokens = (tokens: internalTokenInterface[], format) => {
  if (format === 'standard') {
    return JSON.parse(JSON.stringify(tokens.filter(item => item.category === tokenTypes.font.key)))
      .map(item => {
        item.name = 'typography/' + item.name.substr(item.name.indexOf('/') + 1).trim().trimStart()
        item.category = tokenTypes.typography.key as tokenCategoryType
        item.exportKey = tokenTypes.typography.key as tokenExportKeyType
        item.extensions[config.key.extensionPluginData].exportKey = tokenTypes.typography.key as tokenCategoryType
        return item
      })
  }
  return []
}

export const prepareExport = (tokens: string, settings: Settings) => {
  // parse json string
  let tokenArray: internalTokenInterface[] = JSON.parse(tokens)
  // duplicate font if typography is true && format = standard
  tokenArray = [...tokenArray, ...createTypographyTokens(tokenArray, settings.tokenFormat)]
  // filter by user setting for export keys
  const tokensFiltered: internalTokenInterface[] = tokenArray.filter(({ exportKey }) => settings.exports[exportKey])
  // add to name
  const prefixedTokens = prefixTokenName(tokensFiltered, settings)
  // converted values
  const tokensConverted = prefixedTokens.map(token => tokenTransformer[settings.tokenFormat](token))
  // group items by their names
  // @ts-ignore
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, settings)
  // return tokens
  return tokensGroupedByName
}
