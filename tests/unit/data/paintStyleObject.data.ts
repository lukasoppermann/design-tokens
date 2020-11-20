export const paintStyleObject = {
  name: 'notRecognizedName/paintStyleObject',
  description: 'a description text',
  paints: [
    {
      type: "SOLID",
      color: {
        r: 0.5,
        g: 0.7,
        b: 1
      },
      opacity: 0.5
      // readonly visible?: boolean
      // readonly blendMode?: BlendMode
    }
    // ,
    // {
    //   readonly type: "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND"
    //   readonly gradientTransform: Transform
    //   readonly gradientStops: ReadonlyArray<ColorStop>
  
    //   readonly visible?: boolean
    //   readonly opacity?: number
    //   readonly blendMode?: BlendMode
    // },
    // {
    //   readonly type: "IMAGE"
    //   readonly scaleMode: "FILL" | "FIT" | "CROP" | "TILE"
    //   readonly imageHash: string | null
    //   readonly imageTransform?: Transform // setting for "CROP"
    //   readonly scalingFactor?: number // setting for "TILE"
    //   readonly filters?: ImageFilters
  
    //   readonly visible?: boolean
    //   readonly opacity?: number
    //   readonly blendMode?: BlendMode
    // }
  ]
}