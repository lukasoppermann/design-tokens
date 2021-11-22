import { internalTokenInterface } from '@typings/propertyObject'
import { Settings } from '../../types/settings'
import { transformer as originalFormatTransformer } from '@src/transformer/originalFormatTransformer'
import { transformer as standardTransformer } from '@src/transformer/standardTransformer'
import { groupByKeyAndName } from '@utils/groupByName'

const tokenTransformer = {
  original: originalFormatTransformer,
  standard: standardTransformer
}

export const prepareExport = (tokens: string, settings: Settings) => {
  // parse json string
  const tokenArray: internalTokenInterface[] = JSON.parse(tokens)
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
