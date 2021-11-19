import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenExtensionsInterface } from '@typings/standardToken'

export const tokenExtensions = (token: internalTokenInterface): { extensions: StandardTokenExtensionsInterface; } => {
  return {
    extensions: {
      ...token.extensions
    }
  }
}
