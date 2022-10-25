import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenExtensionsInterface } from '@typings/standardToken'

export const tokenExtensions = (token: internalTokenInterface, formatKeys: {[key: string]: string}, enableExtension: boolean = true): { [key: string]: StandardTokenExtensionsInterface; } => {
  // no extension
  if (enableExtension === false || token.extensions?.length === 0) return
  // extension exists
  return {
    [formatKeys.EXTENSIONS]: {
      ...token.extensions
    }
  }
}
