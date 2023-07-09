import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenExtensionsInterface } from '@typings/standardToken'

export const tokenExtensions = (token: internalTokenInterface, { excludeExtensionProp }): { extensions: StandardTokenExtensionsInterface; } => {
  if (excludeExtensionProp !== true) {
    return {
      extensions: {
        ...token.extensions
      }
    }
  }
}
