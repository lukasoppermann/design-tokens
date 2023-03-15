import { rgbaObjectToHex8 } from '../utilities/convertColor'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenDataInterface, StandardTokenInterfaceV2, StandardTokenTypes } from '@typings/standardToken'
import { FormatKeys } from '@typings/TokenTransformer'
import { TokenTransformer } from './TokenTransformer'
import config from '@config/config'

class StandardTransformerV2 extends TokenTransformer {
  protected _formatKeys: FormatKeys = {
    VALUE: '$value',
    DESCRIPTION: '$description',
    TYPE: '$type',
    EXTENSIONS: '$extensions',
    NAME: 'name'
  }

  transformSize (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.VALUE]: `${token.values.width.value}px`,
      [this._formatKeys.TYPE]: 'dimension' as StandardTokenTypes
    }
  }

  transformColor (token: internalTokenInterface): StandardTokenDataInterface {
    const getColorOrAlias = (token): string => {
      // @ts-ignore
      if (token.extensions?.[config.key.extensionPluginData]?.alias) {
        return `{${token.extensions[config.key.extensionPluginData].alias}}`
      }
      return rgbaObjectToHex8(token.values[0].fill?.value)
    }
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.VALUE]: getColorOrAlias(token),
      [this._formatKeys.TYPE]: 'color' as StandardTokenTypes
    }
  }

  transformGradient (token: internalTokenInterface): StandardTokenDataInterface {
    const getGradientOrAlias = (token): string => {
      // @ts-ignore
      if (token.extensions?.[config.key.extensionPluginData]?.alias) {
        return `{${token.extensions[config.key.extensionPluginData].alias}}`
      }
      // return gradient
      return token.values[0].stops.map(stop => ({
        position: stop.position.value,
        color: rgbaObjectToHex8({
          ...stop.color.value,
          // calculate actual alpha
          ...{ a: stop.color.value.a * token.values[0].opacity.value }
        })
      }))
    }
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.VALUE]: getGradientOrAlias(token),
      [this._formatKeys.TYPE]: 'gradient' as StandardTokenTypes
    }
  }

  transformFont (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      [this._formatKeys.TYPE]: 'typography' as StandardTokenTypes,
      // @ts-ignore
      [this._formatKeys.VALUE]: {
        // @ts-ignore
        fontSize: `${token.values.fontSize.value}px`,
        // @ts-ignore
        fontFamily: token.values.fontFamily.value,
        // @ts-ignore
        fontWeight: token.values.fontWeight.value,
        // @ts-ignore
        letterSpacing: `${token.values.letterSpacing.value}px`,
        // @ts-ignore
        lineHeight: `${token.values.lineHeightRatio.value}`,
        // @ts-ignore
        fontStyle: token.values.fontStyle.value,
        // @ts-ignore
        textDecoration: token.values.textDecoration.value,
        // @ts-ignore
        fontStretch: token.values.fontStretch.value,
        // @ts-ignore
        paragraphIndent: `${token.values.paragraphIndent.value}px`,
        // @ts-ignore
        paragraphSpacing: `${token.values.paragraphSpacing.value}px`,
        // @ts-ignore
        textCase: token.values.textCase.value
      }
    }
  }

  transformEffect (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    const effects = token.values.map(effect => {
      if (['dropShadow', 'innerShadow'].includes(effect.effectType.value)) {
        // @ts-ignore
        return {
          [this._formatKeys.TYPE]: 'shadow' as StandardTokenTypes,
          [this._formatKeys.VALUE]: {
            ...(effect.effectType.value === 'innerShadow' ? { inset: true } : {}),
            color: rgbaObjectToHex8(effect.color.value),
            offsetX: `${effect.offset.x.value}px`,
            offsetY: `${effect.offset.y.value}px`,
            blur: `${effect.radius.value}px`,
            spread: `${effect.spread.value}px`
          }
        }
      }
      // blur not implemented
      return null
    })
    // single effect
    if (effects.length === 1) {
      return effects[0]
    }
    // multiple effects
    return { ...effects }
  }

  transformGrid(token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    const grids = token.values.map(grid => ({
      [this._formatKeys.TYPE]: 'custom-grid' as StandardTokenTypes,
      // @ts-ignore
      [this._formatKeys.VALUE]: {
        pattern: grid.pattern.value,
        ...(grid.sectionSize ? { sectionSize: grid.sectionSize.value } : {}),
        ...(grid.gutterSize ? { gutterSize: grid.gutterSize.value } : {}),
        ...(grid.alignment ? { alignment: grid.alignment.value } : {}),
        ...(grid.count ? { count: grid.count.value } : {}),
        ...(grid.offset ? { offset: grid.offset.value } : {})
      }
    }))
    // single grid
    if (grids.length === 1) {
      return grids[0]
    }
    // multiple grids
    return { ...grids }
  }

  transformBorder (token: internalTokenInterface): StandardTokenDataInterface {
    const borderStyle = (token: internalTokenInterface) => {
      // @ts-ignore
      if (token.values.dashPattern.value.join(',') === '0,0') return 'solid'

      return {
        // @ts-ignore
        dashArray: token.values.dashPattern.value,
        // @ts-ignore
        lineCap: token.values.strokeCap.value
      }
    }

    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.TYPE]: 'border' as StandardTokenTypes,
      // @ts-ignore
      [this._formatKeys.VALUE]: {
        // @ts-ignore
        color: rgbaObjectToHex8(token.values.stroke.value),
        // @ts-ignore
        width: token.values.strokeWeight.value,
        style: borderStyle(token)
      }
    }
  }

  transformBreakpoint (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.VALUE]: `${token.values.width.value}px`,
      [this._formatKeys.TYPE]: 'dimension' as StandardTokenTypes
    }
  }

  transformRadius (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      [this._formatKeys.TYPE]: 'array' as StandardTokenTypes,
      [this._formatKeys.VALUE]: [
        // @ts-ignore
        token.values.radii.topLeft.value,
        // @ts-ignore
        token.values.radii.topRight.value,
        // @ts-ignore
        token.values.radii.bottomRight.value,
        // @ts-ignore
        token.values.radii.bottomLeft.value
      ]
    }
  }

  transformSpacing (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      [this._formatKeys.TYPE]: 'array' as StandardTokenTypes,
      [this._formatKeys.VALUE]: [
        // @ts-ignore
        token.values.top.value,
        // @ts-ignore
        token.values.right.value,
        // @ts-ignore
        token.values.bottom.value,
        // @ts-ignore
        token.values.left.value
      ]
    }
  }

  transformMotion(token: internalTokenInterface): StandardTokenDataInterface {
    const formatDuration = (durationObject: { value: number, unit: string }) => {
      if (durationObject.unit === 'ms') return `${durationObject.value}ms`
      if (durationObject.unit === 's') return `${durationObject.value * 1000}ms`
      throw new Error("Invalid duration unit");
    }

    const formatTimingFunction = (timingFunction: { x1: { value: number }, x2: { value: number }, y1: { value: number }, y2: { value: number } }): [number, number, number, number] => {
      // spring animation is not supported in w3c tokens
      if (Object.hasOwnProperty.call(timingFunction, 'mass')) return null
      return [
        timingFunction.x1.value,
        timingFunction.y1.value,
        timingFunction.x2.value,
        timingFunction.y2.value,
      ]
    }
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.TYPE]: 'transition' as StandardTokenTypes,
      [this._formatKeys.VALUE]: {
        // @ts-ignore
        duration: formatDuration(token.values.duration),
        // @ts-ignore
        delay: "0ms",
        // @ts-ignore
        timingFunction: formatTimingFunction(token.values.easingFunction)
      }
    }
  }

  transformOpacity (token: internalTokenInterface): StandardTokenDataInterface {
    // @ts-ignore
    return {
      // @ts-ignore
      [this._formatKeys.VALUE]: token.values.opacity.value,
      [this._formatKeys.TYPE]: 'number' as StandardTokenTypes
    }
  }

  colorExtension (token: internalTokenInterface) {
    return {
      // @ts-ignore
      blendMode: token.values[0].fill.blendMode?.toLowerCase() || 'normal' // not supported by w3c spec
    }
  }

  gradientExtension (token: internalTokenInterface) {
    return {
      // @ts-ignore
      gradientType: token.values[0].gradientType.value,
      rotation: token.values[0].rotation.value
    }
  }

  radiusExtension (token: internalTokenInterface) {
    return {
      // @ts-ignore
      smoothing: token.values.smoothing.value
    }
  }

  borderExtension (token: internalTokenInterface) {
    return {
      // @ts-ignore
      align: token.values.strokeAlign.value,
      // @ts-ignore
      lineJoin: token.values.strokeJoin.value,
      // @ts-ignore
      miterLimit: token.values.strokeMiterLimit.value
    }
  }
}

const standardTransformerV2Instance = new StandardTransformerV2()

export const standardTransformerV2 = (token: internalTokenInterface): StandardTokenInterfaceV2 => {
  return standardTransformerV2Instance.transform(token)
}
