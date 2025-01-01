import transformName from '@utils/transformName'

const strings: string[] = [
  ' Foo      Bar',
  '--foo-bar--',
  '__FOO_BAR__-',
  'foo123Bar',
  'foo_Bar',
  'foo.Bar:foo,bar;foo+bar*foo—bar',
  'EquipmentClass name',
  'Equipment className',
  'equipment class name',
  '  Equipment Class Name  '
]

describe('transformName', () => {
  // default case only transforms to lowercase and trims
  test('default case', () => {
    const transformed = strings.map(string => transformName(string))
    expect(transformed).toStrictEqual([
      'foo      bar',
      '--foo-bar--',
      '__foo_bar__-',
      'foo123bar',
      'foo_bar',
      'foo.bar:foo,bar;foo+bar*foo—bar',
      'equipmentclass name',
      'equipment classname',
      'equipment class name',
      'equipment class name'
    ])
  })

  // transform to camelCase and trim
  test('camelCase', () => {
    const transformed = strings.map(string => transformName(string, 'camelCase'))
    expect(transformed).toStrictEqual([
      'fooBar',
      'fooBar',
      'fooBar',
      'foo123bar',
      'fooBar',
      'fooBarFooBarFooBarFooBar',
      'equipmentclassName',
      'equipmentClassname',
      'equipmentClassName',
      'equipmentClassName'
    ])
  })

  // transform to kebab-case and trim
  test('kebab-case', () => {
    const transformed = strings.map(string => transformName(string, 'kebabCase'))
    expect(transformed).toStrictEqual([
      'foo-bar',
      'foo-bar',
      'foo-bar',
      'foo123bar',
      'foo-bar',
      'foo-bar-foo-bar-foo-bar-foo-bar',
      'equipmentclass-name',
      'equipment-classname',
      'equipment-class-name',
      'equipment-class-name'
    ])
  })
})
