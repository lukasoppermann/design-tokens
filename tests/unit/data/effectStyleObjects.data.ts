export const effectStyleObjects = [
  {
    name: 'effect/shadow',
    description: 'an effect style',
    type: "EFFECT",
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
    type: "EFFECT",
    effects: [{
      type: "LAYER_BLUR", //| "BACKGROUND_BLUR"
      radius: 7,
      visible: true
    }]
  }
]