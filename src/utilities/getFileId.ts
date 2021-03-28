import config from './config'

const getFileId = (figma: PluginAPI): string => {
  let fileId = figma.root.getPluginData(config.key.fileId)
  // set plugin id if it does not exist
  if (fileId === undefined || fileId === '') {
    figma.root.setPluginData(config.key.fileId, figma.root.name + ' ' + Math.floor(Math.random() * 1000000000))
    // grab file ID
    fileId = figma.root.getPluginData(config.key.fileId)
  }
  return fileId
}

export default getFileId
