import { propertyObject } from './propertyObject'

type extractorInterface = (tokenNodes, prefixArray?: string[] | { [key: string]: string[] }) => propertyObject[];

export default extractorInterface
