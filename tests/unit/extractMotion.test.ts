import extractMotion, { __testing } from '../../src/extractor/extractMotion'
import { customTokenNode } from './data/customTokenNode.data'

describe('extracting motion tokens', () => {
  const nodeArray = [
    customTokenNode,
    { 
      ...customTokenNode,
      ...{ name: 'motion/linear' } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/instant',
        reactions: [{
          action: {
            type: 'NODE',
            transition: null
          }
        }]
      } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/ease_in',
        description: undefined,
        reactions: [{
          action: {
            type: 'NODE',
            transition: {
              type: 'DISSOLVE',
              duration: 0.52124124,
              easing: {
                type: 'EASE_IN'
              }
            }
          }
        }]
      } 
    },
    { 
      ...customTokenNode,
      ...{ 
        name: 'motion/smart',
        reactions: [{
          action: {
            type: 'NODE',
            transition: {
              type: 'SMART_ANIMATE',
              duration: 0.600,
              easing: {
                type: 'CUSTOM_CUBIC_BEZIER',
                easingFunctionCubicBezier: {
                  x1: .345,
                  y1: .234,
                  x2: .334,
                  y2: .9744
                }
              }
            }
          }
        }]
      } 
    }
  ]

  test('extracting only the token with correct name from customTokenNodesArray', () => {
    expect(extractMotion(nodeArray)).toStrictEqual([
      {
        category: 'motion',
        description: 'a description text',
        name: 'motion/linear',
        values: {
          type: {
            value: 'move_in',
            type: 'string'
          },
          duration: {
            value: 321,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'linear',
            type: 'string'
          },
          easingFunction: {
            x1: {
              value: 0,
              type: 'number'
            },
            x2: {
              value: 1,
              type: 'number'
            },
            y1: {
              value: 0,
              type: 'number'
            },
            y2: {
              value: 1,
              type: 'number'
            }
          },
          direction: {
            value: 'left',
            type: 'string'
          }
        }
      },
      {
        category: 'motion',
        description: null,
        name: 'motion/ease_in',
        values: {
          type: {
            value: 'dissolve',
            type: 'string'
          },
          duration: {
            value: 521,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'ease-in',
            type: 'string'
          },
          easingFunction: {
            x1: {
              value: 0.41999998688697815,
              type: 'number'
            },
            x2: {
              value: 1,
              type: 'number'
            },
            y1: {
              value: 0,
              type: 'number'
            },
            y2: {
              value: 1,
              type: 'number'
            }
          }
        }
      },
      {
        category: 'motion',
        description: 'a description text',
        name: 'motion/smart',
        values: {
          type: {
            value: 'smart_animate',
            type: 'string'
          },
          duration: {
            value: 600,
            unit: 'ms',
            type: 'number'
          },
          easing: {
            value: 'cubic-bezier',
            type: 'string'
          },
          easingFunction: {
            x1: {
              value: 0.345,
              type: 'number'
            },
            x2: {
              value: 0.334,
              type: 'number'
            },
            y1: {
              value: 0.234,
              type: 'number'
            },
            y2: {
              value: 0.9744,
              type: 'number'
            }
          }
        }
      }
    ])
  })
})

describe('testing easing curves', () => {
  test('invalid easing type', () => {
    // @ts-ignore
    expect(__testing.easing({ type: 'invalid' })).toStrictEqual()
  })

  test('linear', () => {
    expect(__testing.easing({ type: 'LINEAR' })).toStrictEqual({
      easing: {
        value: 'linear',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0,
          type: 'number'
        },
        x2: {
          value: 1,
          type: 'number'
        },
        y1: {
          value: 0,
          type: 'number'
        },
        y2: {
          value: 1,
          type: 'number'
        }
      }
    })
  })

  test('ease-in', () => {
    expect(__testing.easing({ type: 'EASE_IN' })).toStrictEqual({
      easing: {
        value: 'ease-in',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0.41999998688697815,
          type: 'number'
        },
        x2: {
          value: 1,
          type: 'number'
        },
        y1: {
          value: 0,
          type: 'number'
        },
        y2: {
          value: 1,
          type: 'number'
        }
      }
    })
  })

  test('ease-out', () => {
    expect(__testing.easing({ type: 'EASE_OUT' })).toStrictEqual({
      easing: {
        value: 'ease-out',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0,
          type: 'number'
        },
        x2: {
          value: 0.5799999833106995,
          type: 'number'
        },
        y1: {
          value: 0,
          type: 'number'
        },
        y2: {
          value: 1,
          type: 'number'
        }
      }
    })
  })

  test('ease-in-and-out', () => {
    expect(__testing.easing({ type: 'EASE_IN_AND_OUT' })).toStrictEqual({
      easing: {
        value: 'ease-in-out',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0.41999998688697815,
          type: 'number'
        },
        x2: {
          value: 0.5799999833106995,
          type: 'number'
        },
        y1: {
          value: 0,
          type: 'number'
        },
        y2: {
          value: 1,
          type: 'number'
        }
      }
    })
  })

  test('ease-in-back', () => {
    // @ts-ignore
    expect(__testing.easing({ type: 'EASE_IN_BACK' })).toStrictEqual({
      easing: {
        value: 'ease-in-back',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0.30000001192092896,
          type: 'number'
        },
        x2: {
          value: 0.699999988079071,
          type: 'number'
        },
        y1: {
          value: -0.05000000074505806,
          type: 'number'
        },
        y2: {
          value: -0.5,
          type: 'number'
        }
      }
    })
  })

  test('ease-out-back', () => {
    // @ts-ignore
    expect(__testing.easing({ type: 'EASE_OUT_BACK' })).toStrictEqual({
      easing: {
        value: 'ease-out-back',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0.44999998807907104,
          type: 'number'
        },
        x2: {
          value: 0.800000011920929,
          type: 'number'
        },
        y1: {
          value: 1.4500000476837158,
          type: 'number'
        },
        y2: {
          value: 1,
          type: 'number'
        }
      }
    })
  })

  test('ease-in-and-out-back', () => {
    // @ts-ignore
    expect(__testing.easing({ type: 'EASE_IN_AND_OUT_BACK' })).toStrictEqual({
      easing: {
        value: 'ease-in-out-back',
        type: 'string'
      },
      easingFunction: {
        x1: {
          value: 0.699999988079071,
          type: 'number'
        },
        x2: {
          value: 0.4000000059604645,
          type: 'number'
        },
        y1: {
          value: -0.4000000059604645,
          type: 'number'
        },
        y2: {
          value: 1.399999976158142,
          type: 'number'
        }
      }
    })
  })
})