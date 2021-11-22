import { internalTokenInterface } from '@typings/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { transformer as standardTransformer } from '@src/transformer/standardTransformer'
import { groupByKeyAndName } from '@utils/groupByName'
import { tokenTypes } from '@config/tokenTypes'
import { tokenCategoryType } from '@typings/tokenCategory'
import { tokenExportKeyType } from '@typings/tokenExportKey'
import config from '@config/config'

const tokenTransformer = {
  original: originalFormatTransformer,
  standard: standardTransformer
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
  // converted values
  const tokensConverted = tokensFiltered.map(token => tokenTransformer[settings.tokenFormat](token))
  // group items by their names
  // @ts-ignore
  const tokensGroupedByName = groupByKeyAndName(tokensConverted, settings)
  // return tokens
  return tokensGroupedByName
}
