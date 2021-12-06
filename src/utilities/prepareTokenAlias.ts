import config from '@config/config'
import { OriginalFormatTokenInterface } from '@typings/originalFormatProperties'
import { Settings } from '@typings/settings'
import { StandardTokenInterface } from '@typings/standardToken'

export const prepareTokenAlias = (tokenArray: OriginalFormatTokenInterface[] | StandardTokenInterface[], userSettings: Settings) => {
  // guard
  if (tokenArray.length <= 0) return []
  // nest tokens into object with hierachy defined by name using /
  return tokenArray.map(token => {
    // remove top level prefix from name if desired
    if (userSettings.aliasAddValue === true && token.extensions?.[config.key.extensionPluginData]?.alias !== undefined) {
      token.extensions[config.key.extensionPluginData].alias = token.extensions[config.key.extensionPluginData].alias + '.value'
    }
    // return token
    return token
  })
}
