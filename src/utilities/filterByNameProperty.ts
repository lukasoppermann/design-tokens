import config from '@config/config'

type objectWithNameProperty = {
  name: string,
  [key: string]: any
}

const filterByPropertyName = (object: objectWithNameProperty) => {
  console.log('for ' + object.name, ': ', !config.excludePrefix.includes(object.name.trim().substr(0, 1)))
  return !config.excludePrefix.includes(object.name.trim().substr(0, 1))
}

export default filterByPropertyName
