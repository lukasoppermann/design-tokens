import { convertedPropertyObject, propertyObject } from './propertyObject'

type extractorInterface = (tokenNodes) => (convertedPropertyObject | propertyObject)[];

export default extractorInterface