/* eslint-env browser */
import { urlExportData } from '../../../types/urlExportData'

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

const urlExport = (messageData: urlExportData) => {
  // init request
  const request = new XMLHttpRequest()
  // send to user defined url
  request.open('POST', messageData.url)
  // set request header if provided
  if (messageData.acceptHeader !== '') {
    request.setRequestHeader('Accept', 'application/vnd.github.everest-preview+json')
  }
  // add access token of provided
  if (messageData.accessToken !== '' && messageData.authType !== '') {
    request.setRequestHeader('Authorization', `${messageData.authType} ${messageData.accessToken}`)
  }
  // on error
  request.onerror = (event) => {
    // @ts-ignore
    console.log(event, event.target.responseText, event.target.status)
    window.parent.postMessage({
      pluginMessage: {
        command: 'closePlugin',
        notification: '🚨 An error occured while sending the tokens: check your settings & your server.'
      }
    }, '*')
  }
  // show message on successful push
  request.onload = (progressEvent: ProgressEvent) => {
    // @ts-ignore
    console.log('onload', progressEvent, progressEvent.target.response, progressEvent.target.status)
    window.parent.postMessage({
      pluginMessage: {
        command: 'closePlugin',
        notification: responeHandler(progressEvent.target as XMLHttpRequest)
      }
    }, '*')
  }
  // send request
  request.send(JSON.stringify(messageData.data, null, 2))
}

export { urlExport }
