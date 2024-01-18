const processAliasModes = (variables) => {
  return variables.reduce((collector, variable) => {
    // nothing needs to be done to variables that have no alias modes, or only one mode
    if (!variable.aliasModes || variable.aliasModes.length < 2) {
      collector.push(variable)

      return collector
    }

    const { aliasModes, aliasCollectionName } = variable

    // this was only added for this function to process that data so before we return the variables, we can remove it
    delete variable.aliasModes
    delete variable.aliasCollectionName

    for (const aliasMode of aliasModes) {
      const modeBasedVariable = { ...variable }

      // replace the prefix collection, like "color", with the "color" and the mode like "dark"
      modeBasedVariable.values = modeBasedVariable.values.replace(
        // collection is case-insensitive matching i
        new RegExp(`({${aliasCollectionName}.)`, 'i'),
        `{${aliasCollectionName}.${aliasMode.name}.`
      )

      collector.push(modeBasedVariable)
    }

    return collector
  }, [])
}

export default processAliasModes
