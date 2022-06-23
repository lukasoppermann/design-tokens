// import { StandardTokenGroup, StandardTokenInterface } from '../../../types/standardToken'
// Tokens transformed to the "standard" format
export const transformedStandardTokens = {
  /**
   * size
   */
  size: {
    name: 'size token 16px (height: 24px)',
    value: 16,
    description: 'a size description',
    type: 'dimension',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'size'
      }
    }
  },
  /**
   * breakpoint
   */
  breakpoint: {
    name: 'breakpoint token 1024px (height: 20px)',
    value: 1024,
    description: 'a breakpoint description',
    type: 'dimension',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'breakpoint'
      }
    }
  },
  /**
   * opacity
   */
  opacity: {
    name: 'disabled button opacity',
    value: 0.3,
    description: 'an opacity description',
    type: 'custom-opacity',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'opacity'
      }
    }
  },
  /**
   * spacing
   */
  spacing: {
    name: 'spacing 24, 20,16, 8',
    description: 'a spacing token',
    type: 'custom-spacing',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'spacing'
      }
    },
    value: {
      top: 24,
      bottom: 16,
      right: 20,
      left: 8
    }
  },
  /**
   * radiusMixed
   */
  radiusMixed: {
    name: 'radius 1,2,3,4',
    description: 'a mixed radius token',
    type: 'custom-radius',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'radius'
      }
    },
    value: {
      topLeft: 1,
      topRight: 2,
      bottomRight: 3,
      bottomLeft: 4,
      smoothing: 0.5
    }
  },
  /**
   * radiusSingle
   */
  radiusSingle: {
    name: 'radius 5',
    description: 'a single radius token',
    type: 'custom-radius',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'radius'
      }
    },
    value: {
      topLeft: 5,
      topRight: 5,
      bottomLeft: 5,
      bottomRight: 5,
      smoothing: 0.0
    }
  },
  /**
   * grid
   */
  grid: {
    name: 'grid',
    description: 'a grid token',
    type: 'custom-grid',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'grid'
      }
    },
    value: {
      pattern: 'columns',
      sectionSize: 8,
      gutterSize: 8,
      alignment: 'center',
      count: 6,
      offset: 16
    }
  },
  multiGrid: {
    name: 'multiGrid',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'grid'
      }
    },
    description: 'a multiGrid token',
    0: {
      type: 'custom-grid',
      value: {
        pattern: 'columns',
        sectionSize: 8,
        gutterSize: 8,
        alignment: 'center',
        count: 6,
        offset: 16
      }
    },
    1: {
      type: 'custom-grid',
      value: {
        pattern: 'columns',
        sectionSize: 8,
        gutterSize: 8,
        alignment: 'center',
        count: 6,
        offset: 16
      }
    }
  },
  /**
   * font
   */
  font: {
    name: 'font 16',
    description: 'a font token',
    type: 'custom-fontStyle',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'font'
      }
    },
    value: {
      fontSize: 16,
      textDecoration: 'underline',
      fontFamily: 'Helvetica',
      fontWeight: 700,
      fontStyle: 'italic',
      fontStretch: 'normal',
      letterSpacing: 19.2,
      lineHeight: 19.2,
      paragraphIndent: 0,
      paragraphSpacing: 12,
      textCase: 'none'
    }
  },
  typography: {
    name: 'typography 16',
    description: 'a typography token',
    fontFamily: {
      type: 'string',
      value: 'Helvetica'
    },
    fontSize: {
      type: 'dimension',
      value: 16
    },
    fontStretch: {
      type: 'string',
      value: 'normal'
    },
    fontStyle: {
      type: 'string',
      value: 'italic'
    },
    fontWeight: {
      type: 'number',
      value: 700
    },
    letterSpacing: {
      type: 'dimension',
      value: 0.3
    },
    lineHeight: {
      type: 'dimension',
      value: 18
    },
    paragraphIndent: {
      type: 'dimension',
      value: 0
    },
    paragraphSpacing: {
      type: 'dimension',
      value: 12
    },
    textCase: {
      type: 'string',
      value: 'none'
    },
    textDecoration: {
      type: 'string',
      value: 'underline'
    }
  },

  fontLhPercent: {
    name: 'font-lh-percent',
    description: 'Font with lineheight in percent',
    fontSize: {
      value: 16,
      type: 'dimension'
    },
    textDecoration: {
      value: 'underline',
      type: 'string'
    },
    fontFamily: {
      value: 'Helvetica',
      type: 'string'
    },
    fontWeight: {
      value: 700,
      type: 'number'
    },
    fontStyle: {
      value: 'italic',
      type: 'string'
    },
    fontStretch: {
      value: 'normal',
      type: 'string'
    },
    letterSpacing: {
      value: 0.3,
      type: 'dimension'
    },
    lineHeight: {
      // @ts-ignore
      value: 24,
      type: 'dimension'
    },
    paragraphIndent: {
      value: 0,
      type: 'dimension'
    },
    paragraphSpacing: {
      value: 12,
      type: 'dimension'
    },
    textCase: {
      value: 'none',
      type: 'string'
    }
  },
  /**
   * border
   */
  border: {
    name: 'border',
    description: 'a border token',
    type: 'custom-stroke',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'border'
      }
    },
    value: {
      color: '#ffe600ff',
      weight: 4,
      miterLimit: 0,
      lineJoin: 'round',
      lineCap: 'none',
      dashPattern: [5, 5],
      align: 'center'
    }
  },
  /**
   * gradient
   */
  gradient: {
    name: 'gradient',
    description: 'a gradient token',
    type: 'custom-gradient',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'gradient'
      }
    },
    value: {
      gradientType: 'linear',
      rotation: 45,
      stops: [{
        position: 0,
        color: '#ffe60040'
      }, {
        position: 1,
        color: '#0064fa80'
      }]
    }
  },
  /**
   * color
   */
  color: {
    name: 'background',
    description: 'a color token',
    type: 'color',
    value: '#ffe600ff',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'color'
      }
    }
  },
  aliasColor: {
    name: 'aliasColor',
    description: 'a color token',
    type: 'color',
    value: '{{color}}',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'color',
        alias: '{color}'
      }
    }
  },
  multiColor: {
    name: 'multiColor',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'color'
      }
    },
    description: 'a multi color token',
    0: {
      type: 'color',
      value: '#ffe600ff'
    },
    1: {
      type: 'color',
      value: '#0064ff80'
    }
  },
  /**
   * gradient and color
   */
  gradientAndColor: {
    name: 'gradientAndColor',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'gradient'
      }
    },
    description: 'a gradient and color token',
    0: {
      type: 'custom-gradient',
      value: {
        gradientType: 'linear',
        rotation: 45,
        stops: [{
          position: 0,
          color: '#ffe600ff'
        }, {
          position: 1,
          color: '#0064faff'
        }]
      }
    },
    1: {
      value: '#0064ff80',
      type: 'color'
    }
  },
  colorAndGradient: {
    name: 'colorAndGradient',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'color'
      }
    },
    description: 'a color and gradient token',
    0: {
      value: '#ffe600ff',
      type: 'color'
    },
    1: {
      type: 'custom-gradient',
      value: {
        gradientType: 'linear',
        rotation: 45,
        stops: [{
          position: 0,
          color: '#ffe600ff'
        }, {
          position: 1,
          color: '#0064faff'
        }]
      }
    }
  },
  /**
   * effect
   */
  effect: {
    name: 'effect',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'effect'
      }
    },
    description: 'an effect token',
    type: 'custom-shadow',
    value: {
      shadowType: 'dropShadow',
      radius: 0,
      color: '#0a0c0e1a',
      offsetX: 2,
      offsetY: 4,
      spread: 0
    }
  },
  multiEffect: {
    name: 'multiEffect',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'effect'
      }
    },
    description: 'a multi effect token',
    0: {
      type: 'custom-shadow',
      value: {
        shadowType: 'dropShadow',
        radius: 0,
        color: '#0a0c0e1a',
        offsetX: 2,
        offsetY: 4,
        spread: 0
      }
    },
    1: {
      type: 'custom-shadow',
      value: {
        shadowType: 'dropShadow',
        radius: 0,
        color: '#0a0c0e33',
        offsetX: 2,
        offsetY: 4,
        spread: 0
      }
    }
  },
  /**
   * motion
   */
  motion: {
    name: 'motion',
    description: 'a motion token',
    type: 'custom-transition',
    extensions: {
      'org.lukasoppermann.figmaDesignTokens': {
        exportKey: 'motion'
      }
    },
    value: {
      transitionType: 'slide_in',
      duration: 0.2,
      direction: 'top',
      easingFunction: {
        x1: 0.41999998688697815,
        x2: 0,
        y1: 1,
        y2: 1
      }
    }
  }
// END of object
}
