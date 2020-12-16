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
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE",
  width:  number,
  height: number,
  reactions?: any[]
}
