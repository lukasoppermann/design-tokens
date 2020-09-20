const amazonStyleDirectoryTransformer = (property) => {
  // transform to amazon style directory structure
  Object.keys(property.values).map(function(key) {
    property.values[key] = {
      ...(property.description != null && {description: property.description}),
      ...{ value: property.values[key] }
    }
  })
  // return values
  return property
}

export default amazonStyleDirectoryTransformer