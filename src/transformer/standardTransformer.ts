import { rgbaObjectToHex8 } from '../utilities/convertColor'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenInterface, StandardTokenTypes, StandardTokenDataInterface, StandardTokenGroup } from '@typings/standardToken'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenExtensions } from './tokenExtensions'
import config from '@config/config'
import { changeNotation } from '../utilities/changeNotation'

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

const widthToDimensionTransformer = ({ values }): StandardTokenDataInterface => ({
  value: values.width.value,
  type: 'dimension' as StandardTokenTypes
})

const opacityValueTransformer = ({ values }): StandardTokenDataInterface => ({
  value: values.opacity.value,
  type: 'custom-opacity' as StandardTokenTypes
})

const radiusValueTransformer = ({ values }): StandardTokenDataInterface => ({
  type: 'custom-radius' as StandardTokenTypes,
  value: {
    smoothing: values.smoothing.value,
    topLeft: values.radii.topLeft.value,
    topRight: values.radii.topRight.value,
    bottomLeft: values.radii.bottomLeft.value,
    bottomRight: values.radii.bottomRight.value
  }
})

const gridValueTransformer = ({ values } /*: {values: extractedGridValues[]} */): StandardTokenDataInterface | StandardTokenGroup => {
  const grids = values.map(grid => ({
    type: 'custom-grid' as StandardTokenTypes,
    value: {
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
const spacingValueTransformer = ({ values }): StandardTokenDataInterface => ({
  type: 'custom-spacing' as StandardTokenTypes,
  value: {
    top: values.top.value,
    bottom: values.bottom.value,
    left: values.left.value,
    right: values.right.value
  }
})

const fontStyleValueTransformer = ({ values }): StandardTokenDataInterface => ({
  type: 'custom-fontStyle' as StandardTokenTypes,
  value: {
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

const typographyValueTransformer = ({ _name, values }) => ({
  fontSize: {
    type: 'dimension' as StandardTokenTypes,
    value: values.fontSize.value
  },
  textDecoration: {
    type: 'string' as StandardTokenTypes,
    value: values.textDecoration.value
  },
  fontFamily: {
    type: 'string' as StandardTokenTypes,
    value: values.fontFamily.value
  },
  fontWeight: {
    type: 'number' as StandardTokenTypes,
    value: values.fontWeight.value
  },
  fontStyle: {
    type: 'string' as StandardTokenTypes,
    value: values.fontStyle.value
  },
  fontStretch: {
    type: 'string' as StandardTokenTypes,
    value: values.fontStretch.value
  },
  letterSpacing: {
    type: 'dimension' as StandardTokenTypes,
    value: letterSpacingToDimensions(values)
  },
  lineHeight: {
    type: 'dimension' as StandardTokenTypes,
    value: lineHeightToDimension(values)
  },
  paragraphIndent: {
    type: 'dimension' as StandardTokenTypes,
    value: values.paragraphIndent.value
  },
  paragraphSpacing: {
    type: 'dimension' as StandardTokenTypes,
    value: values.paragraphSpacing.value
  },
  textCase: {
    type: 'string' as StandardTokenTypes,
    value: values.textCase.value
  }
})

const colorValueTransformer = ({ fill }): StandardTokenDataInterface => ({
  type: 'color' as StandardTokenTypes,
  value: rgbaObjectToHex8(fill.value),
  blendMode: fill.blendMode?.toLowerCase() || 'normal'
})

const gradientValueTransformer = ({ gradientType, rotation, stops, opacity }): StandardTokenDataInterface => ({
  type: 'custom-gradient' as StandardTokenTypes,
  value: {
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
      type: Object.hasOwnProperty.call(token.values[0], 'fill') ? 'color' : 'custom-gradient',
      value: `{${token.extensions[config.key.extensionPluginData].alias}}`,
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

const borderValueTransformer = ({ values }): StandardTokenDataInterface => ({
  type: 'custom-stroke' as StandardTokenTypes,
  value: {
    align: values.strokeAlign.value,
    dashPattern: values.dashPattern.value,
    lineCap: values.strokeCap.value,
    lineJoin: values.strokeJoin.value,
    miterLimit: values.strokeMiterLimit.value,
    weight: values.strokeWeight.value,
    color: rgbaObjectToHex8(values.stroke.value)
  }
})

const shadowValueTransformer = (value): StandardTokenDataInterface => ({
  type: 'custom-shadow' as StandardTokenTypes,
  value: {
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

const motionValueTransformer = ({ values }): StandardTokenDataInterface => ({
  type: 'custom-transition' as StandardTokenTypes,
  value: {
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

const transformVariable = ({ values, category }): StandardTokenDataInterface => {
  const refRegEx = /^{[^{}]*}$/
  // is alias
  if (refRegEx.test(values)) {
    return {
      type: category as StandardTokenTypes,
      value: changeNotation(values, '/', '.')
    }
  }
  if (category === 'color') {
    return {
      type: 'color' as StandardTokenTypes,
      value: rgbaObjectToHex8(values.fill.value),
      blendMode: values.fill.blendMode?.toLowerCase() || 'normal'
    }
  }
  if (['dimension', 'boolean', 'string'].includes(category)) {
    return {
      type: category as StandardTokenTypes,
      value: values
    }
  }
}

const transformTokens = (token: internalTokenInterface): StandardTokenDataInterface | StandardTokenGroup => valueTransformer[token.category](token)

const transformer = (token: internalTokenInterface, settings): StandardTokenInterface | StandardTokenGroup => {
  if (token.category === 'typography') {
    // @ts-ignore
    return {
      name: token.name,
      description: token.description,
      ...typographyValueTransformer(token)
    }
  }
  // variable
  if (token.extensions[config.key.extensionPluginData].exportKey === 'variables') {
    return {
      name: token.name,
      description: token.description,
      ...transformVariable(token),
      ...tokenExtensions(token, settings)
    }
  }
  // @ts-ignore
  return {
    name: token.name,
    description: token.description,
    ...transformTokens(token),
    ...tokenExtensions(token, settings)
  }
}

export { transformer }
