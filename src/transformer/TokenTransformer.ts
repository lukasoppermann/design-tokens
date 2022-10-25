import config from '@config/config'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenDataInterface, StandardTokenInterfaceV2 } from '@typings/standardToken'
import { FormatKeys, TokenType } from '@typings/TokenTransformer'

export abstract class TokenTransformer {
  protected abstract _formatKeys: FormatKeys

  private getTokenType (token: internalTokenInterface): TokenType {
    return token.exportKey
  }

  abstract transformSize(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformColor(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformGradient(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformFont(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformEffect(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformGrid(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformBorder(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformBreakpoint(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformRadius(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformSpacing(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformMotion(token: internalTokenInterface): StandardTokenDataInterface
  abstract transformOpacity(token: internalTokenInterface): StandardTokenDataInterface

  private transformTokens (token: internalTokenInterface): StandardTokenDataInterface {
    switch (this.getTokenType(token)) {
      case 'size':
        return this.transformSize(token)
      case 'color':
        return this.transformColor(token)
      case 'gradient':
        return this.transformGradient(token)
      case 'font':
        return this.transformFont(token)
      case 'effect':
        return this.transformEffect(token)
      case 'grid':
        return this.transformGrid(token)
      case 'border':
        return this.transformBorder(token)
      case 'breakpoint':
        return this.transformBreakpoint(token)
      case 'radius':
        return this.transformRadius(token)
      case 'spacing':
        return this.transformSpacing(token)
      case 'motion':
        return this.transformMotion(token)
      case 'opacity':
        return this.transformOpacity(token)
    }
  }

  private _extension (token: internalTokenInterface): { [key: string]: { [key: string]: string } } | undefined {
    // no extension
    if (token.extensions?.length === 0) return
    // extension exists
    return {
      [this._formatKeys.EXTENSIONS]: {
        [config.key.extensionPluginData]: {
          ...token.extensions[config.key.extensionPluginData],
          ...(this[`${this.getTokenType(token)}Extension`]?.(token) || {})
        }
      }
    }
  }

  private _description (token: internalTokenInterface): { [key: string]: string } {
    // no description
    if (token.description === undefined || null) return {}
    // description exists
    return {
      [this._formatKeys.DESCRIPTION]: token.description
    }
  }

  transform (token: internalTokenInterface): StandardTokenInterfaceV2 {
    // @ts-ignore
    return {
      [this._formatKeys.NAME]: token.name,
      ...this._description(token),
      ...this.transformTokens(token),
      ...this._extension(token)
    }
  }
}
