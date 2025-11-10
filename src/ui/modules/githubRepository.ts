import { utf8ToBase64 } from '@utils/base64'
import {
  urlExportRequestBody,
  urlExportSettings
} from '@typings/urlExportData'

export class GithubRepository {
  owner: string
  repo: string
  token: string

  constructor(props: { owner: string; repo: string; token: string }) {
    this.owner = props.owner
    this.repo = props.repo
    this.token = props.token
  }

  async upload(
    { client_payload: clientPayload }: urlExportRequestBody,
    { reference: branch }: urlExportSettings,
    responseHandler: {
      onError: () => void;
      onLoaded: (request: XMLHttpRequest) => void;
    }
  ) {
    const encodedContent = utf8ToBase64(clientPayload.tokens)
    const filepath = clientPayload.filename

    try {
      // Check if branch exists
      const branchExists = await this._checkBranchExists(branch)

      if (!branchExists) {
        // Branch doesn't exist - create it from default branch
        const defaultBranch = await this._getDefaultBranch()
        const defaultBranchSHA = await this._getBranchSHA(defaultBranch)
        await this._createBranch(branch, defaultBranchSHA)
      }

      // Check if file exists to get its SHA (required for updates)
      const fileSHA = await this._getFileSHA(filepath, branch)

      // Upload the file
      const uploadRequest = new XMLHttpRequest()
      uploadRequest.onerror = (_err) => responseHandler.onError()
      uploadRequest.onload = (event) => responseHandler.onLoaded(event.target as XMLHttpRequest)

      this._uploadFile({
        request: uploadRequest,
        content: encodedContent,
        commitMessage: clientPayload.commitMessage || `Update design tokens at ${Date.now()}`,
        filepath: filepath,
        branch: branch,
        fileSHA: fileSHA
      })
    } catch (error) {
      if (error && error.request && error.code === 401) {
        responseHandler.onLoaded(error.request)
      } else {
        responseHandler.onError()
      }
    }
  }

  private _getDefaultBranch(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(
        'GET',
        `https://api.github.com/repos/${this.owner}/${this.repo}`
      )
      this._setRequestHeader(request)

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        const statusCode = request.status
        if (statusCode === 200) {
          const response = JSON.parse(request.responseText)
          resolve(response.default_branch || 'main')
          return
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request
        })
      }

      request.send()
    })
  }

  private _checkBranchExists(branch: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(
        'GET',
        `https://api.github.com/repos/${this.owner}/${this.repo}/git/ref/heads/${branch}`
      )
      this._setRequestHeader(request)

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        const statusCode = request.status
        if (statusCode === 200) {
          resolve(true)
          return
        }

        if (statusCode === 404) {
          resolve(false)
          return
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request
        })
      }

      request.send()
    })
  }

  private _getBranchSHA(branch: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(
        'GET',
        `https://api.github.com/repos/${this.owner}/${this.repo}/git/ref/heads/${branch}`
      )
      this._setRequestHeader(request)

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        const statusCode = request.status
        if (statusCode === 200) {
          const response = JSON.parse(request.responseText)
          resolve(response.object.sha)
          return
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request
        })
      }

      request.send()
    })
  }

  private _createBranch(branchName: string, sha: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(
        'POST',
        `https://api.github.com/repos/${this.owner}/${this.repo}/git/refs`
      )
      this._setRequestHeader(request)

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        const statusCode = request.status
        if (statusCode === 201) {
          resolve()
          return
        }

        if (statusCode === 422) {
          // Check if branch already exists (acceptable) vs other validation errors
          try {
            const response = JSON.parse(request.responseText)
            if (response.message && response.message.includes('Reference already exists')) {
              resolve()
              return
            }
          } catch (_e) {
            // Fall through to reject if we can't parse response
          }
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request
        })
      }

      request.send(JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: sha
      }))
    })
  }

  private _getFileSHA(
    filepath: string,
    branch: string
  ): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open(
        'GET',
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${encodeURIComponent(filepath)}?ref=${branch}`
      )
      this._setRequestHeader(request)

      request.onreadystatechange = (_ev: ProgressEvent) => {
        if (request.readyState !== XMLHttpRequest.DONE) {
          return
        }

        const statusCode = request.status
        if (statusCode === 200) {
          const response = JSON.parse(request.responseText)
          resolve(response.sha)
          return
        }

        if (statusCode === 404) {
          resolve(null)
          return
        }

        reject({
          code: statusCode,
          message: request.response,
          request: request
        })
      }

      request.send()
    })
  }

  private _uploadFile(args: {
    request: XMLHttpRequest;
    filepath: string;
    content: string;
    commitMessage: string;
    branch: string;
    fileSHA: string | null;
  }) {
    const { request, branch, content, commitMessage, filepath, fileSHA } = args

    const body: any = {
      message: commitMessage,
      content: content,
      branch: branch
    }

    // Include SHA if file exists (required for updates)
    if (fileSHA) {
      body.sha = fileSHA
    }

    request.open(
      'PUT',
      `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${encodeURIComponent(filepath)}`
    )
    this._setRequestHeader(request)

    request.send(JSON.stringify(body))
  }

  private _setRequestHeader(request: XMLHttpRequest) {
    request.setRequestHeader('Authorization', `Bearer ${this.token}`)
    request.setRequestHeader('Content-Type', 'application/json')
    request.setRequestHeader('Accept', 'application/vnd.github+json')
  }
}
