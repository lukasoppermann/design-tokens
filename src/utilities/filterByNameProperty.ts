type objectWithNameProperty = {
  name: string,
  [key: string]: any
}

const filterByPropertyName = (prefix: string = '_', exclude: boolean = true) => {
  return (object: objectWithNameProperty) => (object.name.trim().substr(0, prefix.length) !== prefix) === exclude
}

export default filterByPropertyName