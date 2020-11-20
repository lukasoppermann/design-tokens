// export type customTokenNodes = RectangleNode | ComponentNode | FrameNode
export type customTokenNode = {
  name: any,
  bottomLeftRadius: any,
  bottomRightRadius: any,
  topLeftRadius: any,
  topRightRadius: any,
  cornerRadius: any,
  cornerSmoothing: any,
  strokes: any[],
  strokeWeight: any,
  strokeStyleId: any,
  strokeMiterLimit: any,
  strokeMiterAngle: any,
  strokeJoin: StrokeJoin | PluginAPI['mixed'],
  strokeCap: StrokeCap | PluginAPI['mixed'],
  dashPattern: any,
  strokeAlign: any,
  width: any,
  height: any
}
