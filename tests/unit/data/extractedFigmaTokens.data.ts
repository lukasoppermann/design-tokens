export const extractedFigmaTokens = {
  /**
   * Size
   */
  size: {
    name: 'size token 16px (height: 24px)',
    category: 'size',
    exportKey: 'size',
    description: 'a size description',
    values: {
      width: {
        value: 16,
        unit: 'pixel',
        type: 'number'
      },
      height: {
        value: 24,
        unit: 'pixel',
        type: 'number'
      }
    }
  },
  /**
   * breakpoint
   */
  breakpoint: {
    name: 'breakpoint token 1024px (height: 20px)',
    category: 'breakpoint',
    exportKey: 'breakpoint',
    description: 'a breakpoint description',
    values: {
      width: {
        value: 1024,
        unit: 'pixel',
        type: 'number'
      },
      height: {
        value: 20,
        unit: 'pixel',
        type: 'number'
      }
    }
  },
  /**
   * spacing
   */
  spacing: {
    name: 'spacing 24, 20,16, 8',
    category: 'spacing',
    exportKey: 'spacing',
    description: 'a spacing token',
    values: {
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
    }
  },
  /**
   * radiusMixed
   */
  radiusMixed: {
    name: 'radius 1,2,3,4',
    category: 'radius',
    exportKey: 'radius',
    description: 'a mixed radius token',
    values: {
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
        comment: 'Percent as decimal from 0.0 - 1.0',
        type: 'number'
      }
    }
  },
  /**
   * radiusSingle
   */
  radiusSingle: {
    name: 'radius 5',
    category: 'radius',
    exportKey: 'radius',
    description: 'a single radius token',
    values: {
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
        comment: 'Percent as decimal from 0.0 - 1.0',
        type: 'number'
      }
    }
  },
  /**
   * grid
   */
  grid: {
    name: 'grid',
    category: 'grid',
    exportKey: 'grid',
    description: 'a grid token',
    values: [{
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
    }]
  },
  /**
   * font
   */
  font: {
    name: 'font 16',
    category: 'font',
    exportKey: 'font',
    description: 'a font token',
    values: {
      fontSize: {
        value: 16,
        unit: 'pixel',
        type: 'number'
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
        unit: 'percent',
        type: 'number'
      },
      lineHeight: {
        // @ts-ignore
        value: 'normal',
        unit: 'auto',
        type: 'string'
      },
      paragraphIndent: {
        value: 0,
        unit: 'pixel',
        type: 'number'
      },
      paragraphSpacing: {
        value: 12,
        unit: 'pixel',
        type: 'number'
      },
      textCase: {
        value: 'none',
        type: 'string'
      }
    }
  },
  /**
   * border
   */
  border: {
    name: 'border',
    category: 'border',
    exportKey: 'border',
    description: 'a border token',
    values: {
      strokeAlign: {
        value: 'center',
        type: 'string'
      },
      dashPattern: {
        value: '5, 5',
        type: 'string'
      },
      strokeCap: {
        value: 'none',
        type: 'string'
      },
      strokeJoin: {
        value: 'round',
        type: 'string'
      },
      strokeMiterLimit: {
        value: 0,
        unit: 'degree',
        type: 'number'
      },
      strokeWeight: {
        value: 4,
        unit: 'pixel',
        type: 'number'
      },
      stroke: {
        value: { r: 255, g: 230, b: 0, a: 1 },
        type: 'color'
      }
    }
  },
  /**
   * color
   */
  color: {
    name: 'background',
    category: 'color',
    exportKey: 'color',
    description: 'a color token',
    values: [
      {
        fill: {
          value: { r: 255, g: 230, b: 0, a: 1 },
          type: 'color'
        }
      }
    ]
  },
  /**
   * effect
   */
  effect: {
    name: 'effect',
    description: 'an effect token',
    category: 'effect',
    exportKey: 'effect',
    values: [{
      type: {
        value: 'dropShadow',
        type: 'string'
      },
      radius: {
        value: 0,
        unit: 'pixel',
        type: 'number'
      },
      color: {
        value: { r: 10, g: 12, b: 14, a: 0.1 },
        type: 'color'
      },
      offset: {
        x: {
          value: 2,
          unit: 'pixel',
          type: 'number'
        },
        y: {
          value: 4,
          unit: 'pixel',
          type: 'number'
        }
      },
      spread: {
        value: 0,
        unit: 'pixel',
        type: 'number'
      }
    }]
  },
  /**
   * motion
   */
  motion: {
    name: 'motion',
    category: 'motion',
    exportKey: 'motion',
    description: 'a motion token',
    values: {
      type: {
        value: 'slide_in',
        type: 'string'
      },
      duration: {
        value: 0.2,
        unit: 's',
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
      },
      direction: {
        value: 'top',
        type: 'string'
      }
    }
  }
// END of object
}
