export const customTokenNode = {
  name: 'notRecognizedName/customTokenNode',
  description: 'a description text',
  bottomLeftRadius: 3,
  bottomRightRadius: 4,
  topLeftRadius: 5,
  topRightRadius: 0,
  cornerRadius: 'mixed',
  cornerSmoothing: .35,
  strokes: [{r: 255, g: 230, b: 0, a: 1}],
  strokeWeight: 2,
  // strokeStyleId: node.strokeStyleId,
  strokeMiterLimit: 25,
  strokeJoin: "MITER",
  strokeCap: "ROUND",
  dashPattern: '2, 5',
  strokeAlign: 'center',
  width: 10,
  height: 20,
  reactions: [{
    action: {
      type: 'NODE',
      transition: {
        type: 'MOVE_IN',
        duration: 0.32124124,
        direction: 'LEFT',
        easing: {
          type: 'LINEAR'
        }
      }
    }
  }],
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0
}