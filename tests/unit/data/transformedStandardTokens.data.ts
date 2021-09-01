// Tokens transformed to the "standard" format
export const transformedStandardTokens = {
  /**
   * size
   */
  size: {
    'size token 16px (height: 24px)': {
      value: 16,
      description: 'a size description',
      type: 'dimension',
      data: {
        category: 'size',
        exportKey: 'size',
        unit: 'pixel'
      }
    }
  },
  /**
   * breakpoint
   */
  breakpoint: {
    'breakpoint token 1024px (height: 20px)': {
      value: 1024,
      description: 'a breakpoint description',
      type: 'dimension',
      data: {
        category: 'breakpoint',
        exportKey: 'breakpoint',
        unit: 'pixel'
      }
    }
  },
  /**
   * spacing
   */
  spacing: {
    'spacing 24, 20,16, 8': {
      description: 'a spacing token',
      top: {
        value: 24,
        type: 'dimension',
        data: {
          category: 'spacing',
          exportKey: 'spacing',
          unit: 'pixel'
        }
      },
      right: {
        value: 20,
        type: 'dimension',
        data: {
          category: 'spacing',
          exportKey: 'spacing',
          unit: 'pixel'
        }
      },
      bottom: {
        value: 16,
        type: 'dimension',
        data: {
          category: 'spacing',
          exportKey: 'spacing',
          unit: 'pixel'
        }
      },
      left: {
        value: 8,
        type: 'dimension',
        data: {
          category: 'spacing',
          exportKey: 'spacing',
          unit: 'pixel'
        }
      }
    }
  },
  /**
   * radiusMixed
   */
  radiusMixed: {
    'radius 1,2,3,4': {
      description: 'a mixed radius token',
      radiusTopLeft: {
        value: 1,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'radius',
          exportKey: 'radius'
        }
      },
      radiusTopRight: {
        value: 2,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'radius',
          exportKey: 'radius'
        }
      },
      radiusBottomRight: {
        value: 3,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'radius',
          exportKey: 'radius'
        }
      },
      radiusBottomLeft: {
        value: 4,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'radius',
          exportKey: 'radius'
        }
      },
      smoothing: {
        value: 0.5,
        type: 'number',
        data: {
          category: 'radius',
          exportKey: 'radius'
        }
      }
    }
  },
  /**
   * radiusSingle
   */
  radiusSingle: {
    'radius 5': {
      description: 'a single radius token',
      radius: {
        value: 5,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'radius',
          exportKey: 'radius'
        }
      },
      smoothing: {
        value: 0.0,
        type: 'number',
        data: {
          category: 'radius',
          exportKey: 'radius'
        }
      }
    }
  },
  /**
   * grid
   */
  grid: {
    grid: {
      description: 'a grid token',
      pattern: {
        value: 'columns',
        type: 'string',
        data: {
          category: 'grid',
          exportKey: 'grid'
        }
      },
      sectionSize: {
        value: 8,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'grid',
          exportKey: 'grid'
        }
      },
      gutterSize: {
        value: 8,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'grid',
          exportKey: 'grid'
        }
      },
      alignment: {
        value: 'center',
        type: 'string',
        data: {
          category: 'grid',
          exportKey: 'grid'
        }
      },
      count: {
        value: 6,
        type: 'number',
        data: {
          category: 'grid',
          exportKey: 'grid'
        }
      },
      offset: {
        value: 16,
        type: 'dimension',
        data: {
          unit: 'pixel',
          category: 'grid',
          exportKey: 'grid'
        }
      }
    }
  },
  /**
   * font
   */
  font: {
    'font 16': {
      description: 'a font token',
      fontSize: {
        value: 16,
        type: 'dimension',
        data: {
          category: 'font',
          exportKey: 'font',
          unit: 'pixel'
        }
      },
      textDecoration: {
        value: 'underline',
        type: 'string',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      fontFamily: {
        value: 'Helvetica',
        type: 'font',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      fontWeight: {
        value: 700,
        type: 'number',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      fontStyle: {
        value: 'italic',
        type: 'string',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      fontStretch: {
        value: 'normal',
        type: 'string',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      letterSpacing: {
        value: 120,
        type: 'number',
        data: {
          unit: 'percent',
          category: 'font',
          exportKey: 'font'
        }
      },
      lineHeight: {
        value: 'normal',
        type: 'string',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      },
      paragraphIndent: {
        value: 0,
        type: 'number',
        data: {
          unit: 'pixel',
          category: 'font',
          exportKey: 'font'
        }
      },
      paragraphSpacing: {
        value: 12,
        type: 'number',
        data: {
          category: 'font',
          exportKey: 'font',
          unit: 'pixel'
        }
      },
      textCase: {
        value: 'none',
        type: 'string',
        data: {
          category: 'font',
          exportKey: 'font'
        }
      }
    }
  },
  /**
   * border
   */
  border: {
    border: {
      description: 'a border token',
      stroke: {
        value: '#ffe600ff',
        type: 'color',
        data: {
          category: 'border',
          exportKey: 'border'
        }
      },
      strokeWeight: {
        value: 4,
        type: 'number',
        data: {
          unit: 'pixel',
          category: 'border',
          exportKey: 'border'
        }
      },
      strokeMiterLimit: {
        value: 0,
        type: 'number',
        data: {
          unit: 'degree',
          category: 'border',
          exportKey: 'border'
        }
      },
      strokeJoin: {
        value: 'round',
        type: 'string',
        data: {
          category: 'border',
          exportKey: 'border'
        }
      },
      strokeCap: {
        value: 'none',
        type: 'string',
        data: {
          category: 'border',
          exportKey: 'border'
        }
      },
      dashPattern: {
        value: '5, 5',
        type: 'string',
        data: {
          category: 'border',
          exportKey: 'border'
        }
      },
      strokeAlign: {
        value: 'center',
        type: 'string',
        data: {
          category: 'border',
          exportKey: 'border'
        }
      }
    }
  },
  /**
   * color
   */
  color: {
    background: {
      description: 'a color token',
      type: 'color',
      value: '#ffe600ff',
      data: {
        category: 'color',
        exportKey: 'color'
      }
    }
  },
  /**
   * effect
   */
  effect: {
    effect: {
      description: 'an effect token',
      effects: [{
        effectType: {
          value: 'dropShadow',
          type: 'string',
          data: {
            category: 'effect',
            exportKey: 'effect'
          }
        },
        radius: {
          value: 0,
          type: 'dimension',
          data: {
            category: 'effect',
            exportKey: 'effect',
            unit: 'pixel'
          }
        },
        color: {
          value: '#0a0c0e1a',
          type: 'color',
          data: {
            category: 'effect',
            exportKey: 'effect'
          }
        },
        offsetX: {
          value: 2,
          type: 'dimension',
          data: {
            category: 'effect',
            exportKey: 'effect',
            unit: 'pixel'
          }
        },
        offsetY: {
          value: 4,
          type: 'dimension',
          data: {
            category: 'effect',
            exportKey: 'effect',
            unit: 'pixel'
          }
        },
        spread: {
          value: 0,
          type: 'dimension',
          data: {
            category: 'effect',
            exportKey: 'effect',
            unit: 'pixel'
          }
        }
      }
      ]
    }
  },
  /**
   * motion
   */
  motion: {
    motion: {
      description: 'a motion token',
      type: {
        value: 'slide_in',
        type: 'string',
        data: {
          category: 'motion',
          exportKey: 'motion'
        }
      },
      duration: {
        value: 0.2,
        type: 'number',
        data: {
          category: 'motion',
          exportKey: 'motion',
          unit: 's'
        }
      },
      direction: {
        value: 'top',
        type: 'string',
        data: {
          category: 'motion',
          exportKey: 'motion'
        }
      },
      easing: {
        value: 'ease-in',
        type: 'string',
        data: {
          category: 'motion',
          exportKey: 'motion'
        }
      },
      easingFunction: {
        x1: {
          value: 0.41999998688697815,
          type: 'number',
          data: {
            category: 'motion',
            exportKey: 'motion'
          }
        },
        x2: {
          value: 0,
          type: 'number',
          data: {
            category: 'motion',
            exportKey: 'motion'
          }
        },
        y1: {
          value: 1,
          type: 'number',
          data: {
            category: 'motion',
            exportKey: 'motion'
          }
        },
        y2: {
          value: 1,
          type: 'number',
          data: {
            category: 'motion',
            exportKey: 'motion'
          }
        }
      }
    }
  }
// END of object
}
