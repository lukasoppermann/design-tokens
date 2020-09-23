const convertPaint = (paint) => {
  if (paint.type === 'SOLID' && paint.visible === true) {
    return {
      color: {
        value: paint.color
      },
      opacity: {
        value: paint.opacity,
        comment: "Percent of as decimal from 0.0 - 1.0"
      }
    }
  }
  return null
}

export default convertPaint