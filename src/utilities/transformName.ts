
const toCamelCase = (string: string) => {
  return string.toLowerCase()
    .replace(/['"]/g, '')
    .replace(/([-_ ]){1,}/g, ' ')
    .replace(/\W+/g, ' ')
    .trim()
    .replace(/ (.)/g, function ($1) { return $1.toUpperCase() })
    .replace(/ /g, '')
}

const transformName = (name: string, style: string|false = false) => {
  // if camelCase
  if (style === 'camelCase') {
    return toCamelCase(name)
  }
  return name.trim().toLowerCase()
}

// // console.log(toCamelCase('Foo      Bar'))
// // console.log(toCamelCase('--foo-bar--'))
// // console.log(toCamelCase('__FOO_BAR__-'))
// // console.log(toCamelCase('foo123Bar'))
// // console.log(toCamelCase('foo_Bar'))
// // console.log(toCamelCase('foo.Bar:foo,bar;foo+bar*foo—bar'))

// // console.log(toCamelCase('EquipmentClass name'))
// // console.log(toCamelCase('Equipment className'))
// // console.log(toCamelCase('equipment class name'))
// // console.log(toCamelCase('Equipment Class Name'))

export default transformName
