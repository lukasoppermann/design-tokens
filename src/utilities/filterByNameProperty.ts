const excludeUnderscoreStyles = true

type objectWithNameProperty = {
  name: string,
  [key: string]: any
}

const filterByNameProperty = (objects: objectWithNameProperty[]): any[] => {
  if (excludeUnderscoreStyles === true) {
    return objects.filter(style => style.name.trim().substr(0, 1) !== '_')
  }
  return objects
}

export default filterByNameProperty