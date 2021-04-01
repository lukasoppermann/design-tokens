import { ColorRgba } from './valueTypes'

export type customTokenNode = {
  name: string,
  bottomLeftRadius?: number,
  bottomRightRadius?: number,
  topLeftRadius?: number,
  topRightRadius?: number,
  cornerRadius?: number | PluginAPI['mixed'],
  cornerSmoothing?: number,
  strokes: ColorRgba[],
  strokeWeight: number,
  strokeStyleId: string,
  strokeMiterLimit: number,
  strokeJoin: StrokeJoin | PluginAPI['mixed'],
  strokeCap: StrokeCap | PluginAPI['mixed'],
  dashPattern?: readonly number[],
  strokeAlign: 'CENTER' | 'INSIDE' | 'OUTSIDE',
  width: number,
  height: number,
  reactions?: readonly Reaction[],
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
}

export type nodeWithNodeTransition = customTokenNode & {
  reactions: readonly {
    action: {
      readonly type: 'NODE'
      readonly destinationId: string | null
      readonly navigation: Navigation
      readonly transition: Transition | null
      readonly preserveScrollPosition: boolean
      // Only present if navigation == "OVERLAY" and the destination uses
      // overlay position type "RELATIVE"
      readonly overlayRelativePosition?: Vector
    },
    trigger: Trigger
  }[]
}
