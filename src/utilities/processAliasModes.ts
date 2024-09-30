const processAliasModes = (variables) => {
  return variables.reduce((collector, variable) => {
    // only one mode will be passed in if any
    if (!variable.aliasMode) {
      collector.push(variable)

      return collector
    }

    // alias mode singular because only one is shown
    const { aliasMode, aliasCollectionName } = variable

    collector.push({
      ...variable,
      values: variable.values.replace(
        `{${aliasCollectionName}.`,
        `{${aliasCollectionName}.${aliasMode.name.toLowerCase()}.`
      )
    })

    return collector
  }, [])
}

export default processAliasModes
