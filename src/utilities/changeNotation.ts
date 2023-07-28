export const changeNotation = (name, currentDelimiter = '/', desiredDelimiter = '.') => {
  return name.split(currentDelimiter).join(desiredDelimiter).toLowerCase()
}
