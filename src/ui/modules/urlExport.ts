/* eslint-env browser */
import { commands } from '@config/commands'
import config from '@config/config'
import { PluginMessage } from '@typings/pluginEvent'
import { urlExportRequestBody, urlExportSettings } from '@typings/urlExportData'
import { GitlabRepository } from '@ui/modules/gitlabRepository'

const responseHandler = (request: XMLHttpRequest): string => {
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
    return `🚨 ${request.status}: An error occurred, please check the console for details.`
  }
  // if no error
  return '🎉 Design tokens pushed to server!'
}

const ACCEPT_HEADER_KEY = 'Accept'
const CONTENT_TYPE_HEADER_KEY = 'Content-Type'
const AUTHORIZATION_HEADER_KEY = 'Authorization'

const addUrlExportRequestHeaders = (request: XMLHttpRequest, exportSettings: urlExportSettings) => {
  if (exportSettings.authType !== config.key.authType.gitlabToken) {
    // set request header if provided
    request.setRequestHeader('Accept', exportSettings.acceptHeader || 'application/vnd.github.everest-preview+json')

    // set Content-Type header if provided
    request.setRequestHeader('Content-Type', exportSettings.contentType || 'text/plain;charset=UTF-8')
  }

  // add access token if provided
  if (exportSettings.accessToken !== '' && exportSettings.authType !== '' && exportSettings.authType !== config.key.authType.gitlabToken) {
    request.setRequestHeader('Authorization', `${exportSettings.authType} ${exportSettings.accessToken}`)
  }
}

function requestErrorHandler() {
  parent.postMessage(
    {
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification:
            '🚨 An error occurred while sending the tokens: check your settings & your server.'
        }
      } as PluginMessage
    },
    '*'
  )
}

function requestLoadedHandler(request: XMLHttpRequest) {
  // @ts-ignore
  parent.postMessage(
    {
      pluginMessage: {
        command: commands.closePlugin,
        payload: {
          notification: responseHandler(request)
        }
      } as PluginMessage
    },
    '*'
  )
}

const addUrlExportRequestEvents = (request: XMLHttpRequest) => {
  // on error
  request.onerror = (_event) => {
    requestErrorHandler()
  }
  // show message on successful push
  request.onload = (progressEvent: ProgressEvent) => {
    requestLoadedHandler(progressEvent.target as XMLHttpRequest)
  }
}

const generateUrlExportRequestBody = (exportSettings: urlExportSettings, requestBody: urlExportRequestBody) => {
  let body
  if (exportSettings.authType === config.key.authType.gitlabToken) {
    body = new FormData()
    body.append('token', exportSettings.accessToken)
    body.append('ref', exportSettings.reference)
    body.append('variables[FIGMA_EVENT_TYPE]', requestBody.event_type)
    body.append('variables[FIGMA_CLIENT_PAYLOAD_TOKENS]', requestBody.client_payload.tokens)
    body.append('variables[FIGMA_CLIENT_PAYLOAD_FILENAME]', requestBody.client_payload.filename)
    body.append('variables[FIGMA_CLIENT_PAYLOAD_COMMIT_MESSAGE]', requestBody.client_payload.commitMessage)
  } else {
    body = JSON.stringify(requestBody, null, 2)
  }
  return body
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

  if (exportSettings.authType === config.key.authType.gitlabCommit) {
    const gitlabRepo = new GitlabRepository({
      baseUrl: exportSettings.url,
      token: exportSettings.accessToken
    })
    gitlabRepo.upload(requestBody, exportSettings, {
      onError: requestErrorHandler,
      onLoaded: requestLoadedHandler
    })
    return
  }

  // init request
  const request = new XMLHttpRequest()
  // send to user defined url
  request.open('POST', exportSettings.url)

  addUrlExportRequestHeaders(request, exportSettings)

  addUrlExportRequestEvents(request)

  const body = generateUrlExportRequestBody(exportSettings, requestBody)

  // send request
  request.send(body)
}

const _testing = {
  ACCEPT_HEADER_KEY: ACCEPT_HEADER_KEY,
  CONTENT_TYPE_HEADER_KEY: CONTENT_TYPE_HEADER_KEY,
  AUTHORIZATION_HEADER_KEY: AUTHORIZATION_HEADER_KEY,
  addUrlExportRequestHeaders: addUrlExportRequestHeaders,
  generateUrlExportRequestBody: generateUrlExportRequestBody
}

export {
  urlExport,
  _testing
}
