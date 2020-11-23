export const effectStyles = [
  {
    name: 'effect/shadow',
    description: 'an effect style',
    effects: [
      {
        color: { 
          r: 0.1,
          g: 0.2,
          b: 0.3,
          a: 0.4
        },
        offset: {
          x: 5,
          y: 3
        },
        blendMode: "NORMAL",
        type: "DROP_SHADOW",
        radius: 30,
        visible: true
      },
      {
        type: "BACKGROUND_BLUR", //| "BACKGROUND_BLUR"
        radius: 2,
        visible: true
      }
    ],
    // @ts-ignore
    type: "EFFECT",
  },
  {
    name: 'effect/blur no description',
    effects: [{
      type: "LAYER_BLUR", //| "BACKGROUND_BLUR"
      radius: 7,
      visible: true
    }],
    // @ts-ignore
    type: "EFFECT",
  }
]
export const effectStyleObjects = [
  {
    name: 'effect/shadow',
    description: 'an effect style',
    effects: [{
      type: "DROP_SHADOW", //| "INNER_SHADOW"
      color: { 
        r: 0.1,
        g: 0.2,
        b: 0.3,
        a: 0.4
      },
      offset: {
        x: 5,
        y: 3
      },
      radius: 30,
      // readonly spread?: number
      visible: true,
      blendMode: "NORMAL"
    },
    {
      type: "BACKGROUND_BLUR", //| "BACKGROUND_BLUR"
      radius: 2,
      visible: true
    }]
  },
  {
    name: 'effect/blur no description',
    description: undefined,
    effects: [{
      type: "LAYER_BLUR", //| "BACKGROUND_BLUR"
      radius: 7,
      visible: true
    }]
  }
]