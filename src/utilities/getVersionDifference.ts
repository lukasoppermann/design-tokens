import semVerDifference, { versionDifference } from './semVerDifference'
import currentVersion from './version'
import config from '@config/config'

const getVersionDifference = async (figma: PluginAPI): Promise<versionDifference> => {
  // get version & version difference
  const lastVersionSettingsOpened = await figma.clientStorage.getAsync(config.key.lastVersionSettingsOpened)
  const versionDifference = semVerDifference(currentVersion, lastVersionSettingsOpened)
  // update version
  if (!lastVersionSettingsOpened || lastVersionSettingsOpened !== currentVersion) {
    await figma.clientStorage.setAsync(config.key.lastVersionSettingsOpened, currentVersion)
  }
  // return version Difference
  return versionDifference
}

export default getVersionDifference
