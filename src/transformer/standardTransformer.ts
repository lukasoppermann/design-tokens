import { rgbaObjectToHex8 } from '../utilities/convertColor'
import { internalTokenInterface } from '@typings/propertyObject'
import { StandardTokenInterface, StandardTokenTypes, StandardTokenDataInterface, StandardTokenGroup } from '@typings/standardToken'
import roundWithDecimals from '../utilities/roundWithDecimals'
import { tokenExtensions } from './tokenExtensions'

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
  return 0
}

const widthToDimensionTransformer = ({ values }): StandardTokenDataInterface => ({
  value: values.width.value,
  type: 'dimension' as StandardTokenTypes
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

const fontValueTransformer = ({ values }): StandardTokenDataInterface => ({
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

const colorValueTransformer = ({ fill }): StandardTokenDataInterface => ({
  type: 'color' as StandardTokenTypes,
  value: rgbaObjectToHex8(fill.value)
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

const fillValueTransformer = ({ values }): StandardTokenDataInterface | StandardTokenGroup => {
  const fills = values.map(fill => {
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
    easingFunction: {
      x1: values.easingFunction.x1.value,
      x2: values.easingFunction.x2.value,
      y1: values.easingFunction.y1.value,
      y2: values.easingFunction.y2.value
    }
  }
})

const valueTransformer = {
  size: widthToDimensionTransformer,
  color: fillValueTransformer,
  gradient: fillValueTransformer,
  font: fontValueTransformer,
  effect: effectValueTransformer,
  grid: gridValueTransformer,
  border: borderValueTransformer,
  breakpoint: widthToDimensionTransformer,
  radius: radiusValueTransformer,
  spacing: spacingValueTransformer,
  motion: motionValueTransformer
}

const transformTokens = (token: internalTokenInterface): StandardTokenDataInterface | StandardTokenGroup => valueTransformer[token.category](token)

const transformer = (token: internalTokenInterface): StandardTokenInterface | StandardTokenGroup => {
  // @ts-ignore
  return {
    name: token.name,
    description: token.description,
    ...transformTokens(token),
    ...tokenExtensions(token)
  }
}

export { transformer }
