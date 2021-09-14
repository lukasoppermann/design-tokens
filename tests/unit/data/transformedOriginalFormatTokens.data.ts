// Tokens transformed to the "originalFormat"
export const transformedOriginalTokens = {
  /**
   * size
   */
  size: {
    name: 'size token 16px (height: 24px)',
    comment: 'a size description',
    category: 'size',
    exportKey: 'size',
    type: 'number',
    unit: 'pixel',
    value: 16
  },
  /**
   * breakpoint
   */
  breakpoint: {
    name: 'breakpoint token 1024px (height: 20px)',
    comment: 'a breakpoint description',
    category: 'breakpoint',
    exportKey: 'breakpoint',
    type: 'number',
    unit: 'pixel',
    value: 1024
  },
  /**
   * spacing
   */
  spacing: {
    name: 'spacing 24, 20,16, 8',
    comment: 'a spacing token',
    category: 'spacing',
    exportKey: 'spacing',
    top: {
      value: 24,
      unit: 'pixel',
      type: 'number'
    },
    right: {
      value: 20,
      unit: 'pixel',
      type: 'number'
    },
    bottom: {
      value: 16,
      unit: 'pixel',
      type: 'number'
    },
    left: {
      value: 8,
      unit: 'pixel',
      type: 'number'
    }
  },
  /**
   * radiusMixed
   */
  radiusMixed: {
    name: 'radius 1,2,3,4',
    comment: 'a mixed radius token',
    category: 'radius',
    exportKey: 'radius',
    radiusType: {
      value: 'mixed',
      type: 'string'
    },
    radii: {
      topLeft: {
        value: 1,
        unit: 'pixel',
        type: 'number'
      },
      topRight: {
        value: 2,
        unit: 'pixel',
        type: 'number'
      },
      bottomRight: {
        value: 3,
        unit: 'pixel',
        type: 'number'
      },
      bottomLeft: {
        value: 4,
        unit: 'pixel',
        type: 'number'
      }
    },
    smoothing: {
      value: 0.5,
      type: 'number'
    }
  },
  /**
   * radiusSingle
   */
  radiusSingle: {
    name: 'radius 5',
    comment: 'a single radius token',
    category: 'radius',
    exportKey: 'radius',
    radius: {
      value: 5,
      unit: 'pixel',
      type: 'number'
    },
    radiusType: {
      value: 'single',
      type: 'string'
    },
    radii: {
      topLeft: {
        value: 5,
        unit: 'pixel',
        type: 'number'
      },
      topRight: {
        value: 5,
        unit: 'pixel',
        type: 'number'
      },
      bottomRight: {
        value: 5,
        unit: 'pixel',
        type: 'number'
      },
      bottomLeft: {
        value: 5,
        unit: 'pixel',
        type: 'number'
      }
    },
    smoothing: {
      value: 0.0,
      type: 'number'
    }
  },
  /**
   * grid
   */
  grid: {
    name: 'grid',
    comment: 'a grid token',
    category: 'grid',
    exportKey: 'grid',
    pattern: {
      value: 'columns',
      type: 'string'
    },
    sectionSize: {
      value: 8,
      unit: 'pixel',
      type: 'number'
    },
    gutterSize: {
      value: 8,
      type: 'number',
      unit: 'pixel'
    },
    alignment: {
      value: 'center',
      type: 'string'
    },
    count: {
      value: 6,
      type: 'number'
    },
    offset: {
      value: 16,
      type: 'number',
      unit: 'pixel'
    }
  },
  /**
   * font
   */
  font: {
    name: 'font 16',
    category: 'font',
    exportKey: 'font',
    comment: 'a font token',
    fontSize: {
      value: 16,
      type: 'number',
      unit: 'pixel'
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
    _fontStyleOld: {
      value: 'bold italic',
      type: 'string'
    },
    letterSpacing: {
      value: 120,
      type: 'number',
      unit: 'percent'
    },
    lineHeight: {
      value: 'normal',
      type: 'string',
      unit: 'auto'
    },
    paragraphIndent: {
      value: 0,
      type: 'number',
      unit: 'pixel'
    },
    paragraphSpacing: {
      value: 12,
      type: 'number',
      unit: 'pixel'
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
    category: 'border',
    exportKey: 'border',
    comment: 'a border token',
    stroke: {
      value: 'rgba(255, 230, 0, 1)',
      type: 'color'
    },
    strokeWeight: {
      value: 4,
      unit: 'pixel',
      type: 'number'
    },
    strokeMiterLimit: {
      value: 0,
      unit: 'degree',
      type: 'number'
    },
    strokeJoin: {
      value: 'round',
      type: 'string'
    },
    strokeCap: {
      value: 'none',
      type: 'string'
    },
    dashPattern: {
      value: '5, 5',
      type: 'string'
    },
    strokeAlign: {
      value: 'center',
      type: 'string'
    }
  },
  /**
   * color
   */
  color: {
    name: 'background',
    comment: 'a color token',
    category: 'color',
    exportKey: 'color',
    type: 'color',
    value: 'rgba(255, 230, 0, 1)'
  },
  /**
   * effect
   */
  effect: {
    name: 'effect',
    comment: 'an effect token',
    category: 'effect',
    exportKey: 'effect',
    type: {
      value: 'dropShadow',
      type: 'string'
    },
    radius: {
      value: 0,
      type: 'number',
      unit: 'pixel'
    },
    color: {
      value: 'rgba(10, 12, 14, 0.1)',
      type: 'color'
    },
    offset: {
      x: {
        value: 2,
        type: 'number',
        unit: 'pixel'
      },
      y: {
        value: 4,
        type: 'number',
        unit: 'pixel'
      }
    },
    spread: {
      value: 0,
      type: 'number',
      unit: 'pixel'
    }
  },
  /**
   * motion
   */
  motion: {
    name: 'motion',
    category: 'motion',
    exportKey: 'motion',
    comment: 'a motion token',
    type: {
      value: 'slide_in',
      type: 'string'
    },
    duration: {
      value: 0.2,
      unit: 's',
      type: 'number'
    },
    direction: {
      value: 'top',
      type: 'string'
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
        value: 0,
        type: 'number'
      },
      y1: {
        value: 1,
        type: 'number'
      },
      y2: {
        value: 1,
        type: 'number'
      }
    }
  }
// END of object
}
