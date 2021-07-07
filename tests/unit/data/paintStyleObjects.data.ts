export const paintStyles = [
  {
    name: 'red',
    description: 'a description text',
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: {
          r: 1,
          g: 0.1,
          b: 0.7299998998641968
        },
        opacity: 0.5,
        visible: true
      }
    ]
  },
  {
    name: 'multi',
    description: 'multiple fills',
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: {
          r: 1,
          g: 0.1,
          b: 0.7299998998641968
        },
        opacity: 0.5,
        visible: true
      },
      {
        blendMode: 'NORMAL',
        type: 'GRADIENT_LINEAR',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      }
    ]
  },
  {
    name: 'gradient and color',
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'GRADIENT_LINEAR',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      },
      {
        blendMode: 'NORMAL',
        type: 'Wrong',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      },
      {
        type: 'SOLID',
        color: {
          r: 0.2,
          g: 0.5,
          b: 0.9
        },
        opacity: 0.11,
        visible: true
      }
    ]
  },
  {
    name: 'image',
    description: 'an image fill',
    paints: [
      {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: null,
        visible: true,
        opacity: 0.99
      }
    ]
  }
]

export const paintStyleObjects = [
  {
    name: 'red',
    description: 'a description text',
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: {
          r: 1,
          g: 0.1,
          b: 0.7299998998641968
        },
        opacity: 0.5,
        visible: true
      }
    ]
  },
  {
    name: 'multi',
    description: 'multiple fills',
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'SOLID',
        color: {
          r: 1,
          g: 0.1,
          b: 0.7299998998641968
        },
        opacity: 0.5,
        visible: true
      },
      {
        blendMode: 'NORMAL',
        type: 'GRADIENT_LINEAR',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      }
    ]
  },
  {
    name: 'gradient and color',
    description: undefined,
    paints: [
      {
        blendMode: 'NORMAL',
        type: 'GRADIENT_LINEAR',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      },
      {
        blendMode: 'NORMAL',
        type: 'Wrong',
        opacity: 0.35,
        gradientTransform: [
          [6.123234262925839e-17, 1, 0],
          [0, 1, 6.123234262925839e-17]
        ],
        gradientStops: [{
          color: {
            r: 1,
            g: 0.7199999690055847,
            b: 0,
            a: 1
          },
          position: 0
        },
        {
          color: {
            r: 1,
            g: 0.2,
            b: 0.3,
            a: 1
          },
          position: 1
        }],
        visible: true
      },
      {
        type: 'SOLID',
        color: {
          r: 0.2,
          g: 0.5,
          b: 0.9
        },
        opacity: 0.11,
        visible: true
      }
    ]
  },
  {
    name: 'image',
    description: 'an image fill',
    paints: [
      {
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: null,
        visible: true,
        opacity: 0.99
      }
    ]
  }
]
