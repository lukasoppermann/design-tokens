/**
 * @name getAccessToken
 * @description returns the access token for the current file or undefined
 * @param fileId {string} — ID of the current file
 */
const getAccessToken = async (fileId: string): Promise<string> => {
  // get all access tokens
  const accessTokens = await figma.clientStorage.getAsync('accessTokens')
  // if access tokens object is present
  if (accessTokens !== undefined && accessTokens instanceof Object) {
    // retrieve the access token from the cache
    const accessToken = accessTokens[fileId]
    // return the access token or an empty string
    return accessToken
  }
  // return empty string if no token is stored
  return ''
}
/**
 * @name setAccessToken
 * @description store the access token for the current fiven file in the user clientStorage
 * @param fileId {string} — ID of the current file
 * @param fileId {string} — access token
 */
const setAccessToken = async (fileId: string, accessToken: string) => {
  // get the access token object
  const accessTokens = (await figma.clientStorage.getAsync('accessTokens')) || {}
  // merge the new token into the object
  return await figma.clientStorage.setAsync('accessTokens', {
    ...accessTokens,
    ...{ [fileId]: accessToken }
  })
}

export { getAccessToken, setAccessToken }