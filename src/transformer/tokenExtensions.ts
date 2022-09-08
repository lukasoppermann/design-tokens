import { formatKeysType } from '@config/format'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenExtensionsInterface } from '@typings/standardToken'

export const tokenExtensions = (token: internalTokenInterface, formatKeys: formatKeysType): { [key: string]: StandardTokenExtensionsInterface; } => {
  return {
    [formatKeys.EXTENSIONS]: {
      ...token.extensions
    }
  }
}
