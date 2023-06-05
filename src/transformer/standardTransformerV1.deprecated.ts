import { rgbaObjectToHex8 } from '../utilities/convertColor'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenTypes, StandardTokenDataInterface, StandardTokenGroup, StandardTokenInterfaceV2 } from '@typings/standardToken'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenExtensions } from './tokenExtensions'
import config from '@config/config'

const formatKeys = {
  VALUE: 'value',
  DESCRIPTION: 'description',
  TYPE: 'type',
  EXTENSIONS: 'extensions',
  NAME: 'name'
}

const lineHeightToDimension = (values): number => {
  if (values.lineHeight.unit === 'pixel') {
    return roundWithDecimals(values.lineHeight.value, 3)
  }
  if (values.lineHeight.unit === 'percent') {
    return roundWithDecimals(values.fontSize.value * (values.lineHeight.value / 100), 3)
  }
  return roundWithDecimals(values.fontSize.value * 1.2, 3)
}

const letterSpacingToDimensions = (values): number => {
  if (values.letterSpacing.unit === 'pixel') {
    return roundWithDecimals(values.letterSpacing.value, 3)
  }
  if (values.letterSpacing.unit === 'percent') {
    return roundWithDecimals(values.fontSize.value * (values.letterSpacing.value / 100), 3)
  }
}

const widthToDimensionTransformer = ({ values }) => ({
  [formatKeys.VALUE]: values.width.value,
  [formatKeys.TYPE]: 'dimension' as StandardTokenTypes
})

const opacityValueTransformer = ({ values }) => ({
  [formatKeys.VALUE]: values.opacity.value,
  [formatKeys.TYPE]: 'custom-opacity' as StandardTokenTypes
})

const radiusValueTransformer = ({ values }) => ({
  [formatKeys.TYPE]: 'custom-radius' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    smoothing: values.smoothing.value,
    topLeft: values.radii.topLeft.value,
    topRight: values.radii.topRight.value,
    bottomLeft: values.radii.bottomLeft.value,
    bottomRight: values.radii.bottomRight.value
  }
})

const gridValueTransformer = ({ values } /*: {values: extractedGridValues[]} */): StandardTokenDataInterface | StandardTokenGroup => {
  const grids = values.map(grid => ({
    [formatKeys.TYPE]: 'custom-grid' as StandardTokenTypes,
    [formatKeys.VALUE]: {
      pattern: grid.pattern.value,
      ...(grid.sectionSize ? { sectionSize: grid.sectionSize.value } : {}),
      ...(grid.gutterSize ? { gutterSize: grid.gutterSize.value } : {}),
      ...(grid.alignment ? { alignment: grid.alignment.value } : {}),
      ...(grid.count ? { count: grid.count.value } : {}),
      ...(grid.offset ? { offset: grid.offset.value } : {})
    }
  }))
  // only one grid
  if (grids.length === 1) {
    return grids[0]
  }
  // return multiple grids
  return { ...grids }
}
const spacingValueTransformer = ({ values }) => ({
  [formatKeys.TYPE]: 'custom-spacing' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    top: values.top.value,
    bottom: values.bottom.value,
    left: values.left.value,
    right: values.right.value
  }
})

const fontStyleValueTransformer = ({ values }) => ({
  [formatKeys.TYPE]: 'custom-fontStyle' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    fontSize: values.fontSize.value,
    textDecoration: values.textDecoration.value,
    fontFamily: values.fontFamily.value,
    fontWeight: values.fontWeight.value,
    fontStyle: values.fontStyle.value,
    fontStretch: values.fontStretch.value,
    letterSpacing: letterSpacingToDimensions(values),
    lineHeight: lineHeightToDimension(values),
    paragraphIndent: values.paragraphIndent.value,
    paragraphSpacing: values.paragraphSpacing.value,
    textCase: values.textCase.value
  }
})

const typographyValueTransformer = ({ name, values }) => ({
  fontSize: {
    [formatKeys.TYPE]: 'dimension' as StandardTokenTypes,
    [formatKeys.VALUE]: values.fontSize.value
  },
  textDecoration: {
    [formatKeys.TYPE]: 'string' as StandardTokenTypes,
    [formatKeys.VALUE]: values.textDecoration.value
  },
  fontFamily: {
    [formatKeys.TYPE]: 'string' as StandardTokenTypes,
    [formatKeys.VALUE]: values.fontFamily.value
  },
  fontWeight: {
    [formatKeys.TYPE]: 'number' as StandardTokenTypes,
    [formatKeys.VALUE]: values.fontWeight.value
  },
  fontStyle: {
    [formatKeys.TYPE]: 'string' as StandardTokenTypes,
    [formatKeys.VALUE]: values.fontStyle.value
  },
  fontStretch: {
    [formatKeys.TYPE]: 'string' as StandardTokenTypes,
    [formatKeys.VALUE]: values.fontStretch.value
  },
  letterSpacing: {
    [formatKeys.TYPE]: 'dimension' as StandardTokenTypes,
    [formatKeys.VALUE]: letterSpacingToDimensions(values)
  },
  lineHeight: {
    [formatKeys.TYPE]: 'dimension' as StandardTokenTypes,
    [formatKeys.VALUE]: lineHeightToDimension(values)
  },
  paragraphIndent: {
    [formatKeys.TYPE]: 'dimension' as StandardTokenTypes,
    [formatKeys.VALUE]: values.paragraphIndent.value
  },
  paragraphSpacing: {
    [formatKeys.TYPE]: 'dimension' as StandardTokenTypes,
    [formatKeys.VALUE]: values.paragraphSpacing.value
  },
  textCase: {
    [formatKeys.TYPE]: 'string' as StandardTokenTypes,
    [formatKeys.VALUE]: values.textCase.value
  }
})

const colorValueTransformer = ({ fill }) => ({
  [formatKeys.TYPE]: 'color' as StandardTokenTypes,
  [formatKeys.VALUE]: rgbaObjectToHex8(fill.value),
  blendMode: fill.blendMode?.toLowerCase() || 'normal'
})

const gradientValueTransformer = ({ gradientType, rotation, stops, opacity }) => ({
  [formatKeys.TYPE]: 'custom-gradient' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    gradientType: gradientType.value,
    rotation: rotation.value,
    stops: stops.map(stop => ({
      position: stop.position.value,
      color: rgbaObjectToHex8({
        ...stop.color.value,
        // calculate actual alpha
        ...{ a: stop.color.value.a * opacity.value }
      })
    }))
  }
})

const fillValueTransformer = (token): StandardTokenDataInterface | StandardTokenGroup => {
  // check for alias
  if (token.extensions && token.extensions[config.key.extensionPluginData] && token.extensions[config.key.extensionPluginData].alias) {
    return {
      [formatKeys.TYPE]: Object.hasOwnProperty.call(token.values[0], 'fill') ? 'color' : 'custom-gradient',
      [formatKeys.VALUE]: `{${token.extensions[config.key.extensionPluginData].alias}}`,
      blendMode: token.values[0]?.fill?.blendMode?.toLowerCase() || 'normal'
    }
  }
  // no alias, use value
  const fills = token.values.map(fill => {
    if (Object.hasOwnProperty.call(fill, 'fill')) {
      return colorValueTransformer(fill)
    }
    return gradientValueTransformer(fill)
  })
  // only one fill
  if (fills.length === 1) {
    return fills[0]
  }
  // multiple fills
  return { ...fills }
}

const borderValueTransformer = ({ values }) => ({
  [formatKeys.TYPE]: 'custom-stroke' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    align: values.strokeAlign.value,
    dashPattern: values.dashPattern.value,
    lineCap: values.strokeCap.value,
    lineJoin: values.strokeJoin.value,
    miterLimit: values.strokeMiterLimit.value,
    weight: values.strokeWeight.value,
    color: rgbaObjectToHex8(values.stroke.value)
  }
})

const shadowValueTransformer = (value) => ({
  [formatKeys.TYPE]: 'custom-shadow' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    shadowType: value.effectType.value,
    radius: value.radius.value,
    color: rgbaObjectToHex8(value.color.value),
    offsetX: value.offset.x.value,
    offsetY: value.offset.y.value,
    spread: value.spread.value
  }
})

const effectValueTransformer = ({ values }): StandardTokenDataInterface | StandardTokenGroup => {
  const effects = values.map(effect => {
    if (['dropShadow', 'innerShadow'].includes(effect.effectType.value)) {
      return shadowValueTransformer(effect)
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

const motionValueTransformer = ({ values }) => ({
  [formatKeys.TYPE]: 'custom-transition' as StandardTokenTypes,
  [formatKeys.VALUE]: {
    transitionType: values.transitionType.value,
    duration: values.duration.value,
    ...(values.direction ? { direction: values.direction.value } : {}),
    easingType: values.easingCurveType.value,
    easingFunction: Object.fromEntries(
      Object.entries(values.easingFunction).map(prop => {
        // @ts-ignore
        return [prop[0], prop[1].value]
      }
      ))
  }
})

const valueTransformer = {
  size: widthToDimensionTransformer,
  color: fillValueTransformer,
  gradient: fillValueTransformer,
  font: fontStyleValueTransformer,
  effect: effectValueTransformer,
  grid: gridValueTransformer,
  border: borderValueTransformer,
  breakpoint: widthToDimensionTransformer,
  radius: radiusValueTransformer,
  spacing: spacingValueTransformer,
  motion: motionValueTransformer,
  opacity: opacityValueTransformer
}

const transformTokens = (token: internalTokenInterface): StandardTokenDataInterface | StandardTokenGroup => valueTransformer[token.category](token)

const standardTransformerV1 = (token: internalTokenInterface): StandardTokenInterfaceV2 | StandardTokenGroup => {
  if (token.category === 'typography') {
    // @ts-ignore
    return {
      [formatKeys.NAME]: token.name,
      [formatKeys.DESCRIPTION]: token.description,
      ...typographyValueTransformer(token)
    }
  }
  // @ts-ignore
  return {
    [formatKeys.NAME]: token.name,
    [formatKeys.DESCRIPTION]: token.description,
    ...transformTokens(token),
    ...tokenExtensions(token, formatKeys)
  }
}

export { standardTransformerV1 }
