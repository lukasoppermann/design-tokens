module.exports = {
  type: 'value',
  matcher: function (token) {
    return token.type === 'custom-stroke'
  },
  transformer: ({ value: { dashPattern, weight } }) => {
    if (dashPattern.length) {
      const [a, b] = dashPattern
      const style = (a / b === 1) ? 'dashed' : 'dotted'

      return `${weight}px ${style}`
    }

    return `${weight}px solid`
  }
}
