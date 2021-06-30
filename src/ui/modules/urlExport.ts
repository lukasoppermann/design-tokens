/* eslint-env browser */
import { commands } from '@config/commands'
import { PluginMessage } from '@typings/pluginEvent'
import { urlExportRequestBody, urlExportSettings } from '@typings/urlExportData'

const responeHandler = (request: XMLHttpRequest): string => {
  // 401
  if (request.status === 401) {
    return '🚨 401: Check your access token'
  }
  // 404
  if (request.status === 404) {
    return '🚨 404: Check your server url, auth type and the access token'
  }
  // if other error
  if (request.status > 399) {
    return `🚨 ${request.status}: An error occured, please check the console for details.`
  }
  // if no error
  return '🎉 Design tokens pushed to server!'
}

const urlExport = (parent, exportSettings: urlExportSettings, requestBody: urlExportRequestBody) => {
  // abort on missing url
  if (exportSettings.url === '') {
    // @ts-ignore
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '🚨 No server url was provided, push aborted!'
        }
      } as PluginMessage
    }, '*')
  }
  // init request
  const request = new XMLHttpRequest()
  // send to user defined url
  request.open('POST', exportSettings.url)
  // set request header if provided
  if (exportSettings.acceptHeader !== '') {
    request.setRequestHeader('Accept', 'application/vnd.github.everest-preview+json')
  }
  // add access token of provided
  if (exportSettings.accessToken !== '' && exportSettings.authType !== '') {
    request.setRequestHeader('Authorization', `${exportSettings.authType} ${exportSettings.accessToken}`)
  }
  // on error
  request.onerror = (event) => {
    // @ts-ignore
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: '🚨 An error occured while sending the tokens: check your settings & your server.'
        }
      } as PluginMessage
    }, '*')
  }
  // show message on successful push
  request.onload = (progressEvent: ProgressEvent) => {
    // @ts-ignore
    parent.postMessage({
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: responeHandler(progressEvent.target as XMLHttpRequest)
        }
      } as PluginMessage
    }, '*')
  }
  // send request
  request.send(JSON.stringify(requestBody, null, 2))
}

export { urlExport }
