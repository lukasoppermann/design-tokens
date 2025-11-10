import { GithubRepository } from '@ui/modules/githubRepository'
import { urlExportRequestBody, urlExportSettings } from '@typings/urlExportData'

// Helper to wait for async operations
const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

// Mock XMLHttpRequest
class MockXMLHttpRequest {
  readyState: number = 0
  status: number = 0
  response: any = ''
  responseText: string = ''
  onreadystatechange: ((_ev: ProgressEvent) => void) | null = null
  onload: ((_ev: ProgressEvent) => void) | null = null
  onerror: ((_ev: ProgressEvent) => void) | null = null
  protected _method: string = ''
  protected _url: string = ''
  private _headers: Record<string, string> = {}

  static DONE = 4

  open (method: string, url: string) {
    this._method = method
    this._url = url
  }

  setRequestHeader (header: string, value: string) {
    this._headers[header] = value
  }

  send (body?: string) {
    // Simulate async behavior
    setTimeout(() => {
      this.readyState = MockXMLHttpRequest.DONE
      
      // Simulate responses based on URL patterns
      if (this._url.includes('/repos/') && !this._url.includes('/contents/') && !this._url.includes('/refs/')) {
        // Get repository info (default branch)
        this.status = 200
        this.responseText = JSON.stringify({ default_branch: 'main' })
      } else if (this._url.includes('/git/refs/heads/')) {
        // Check branch exists
        if (this._url.includes('test-branch')) {
          this.status = 200
          this.responseText = JSON.stringify({ ref: 'refs/heads/test-branch', object: { sha: 'abc123' } })
        } else if (this._url.includes('main')) {
          this.status = 200
          this.responseText = JSON.stringify({ ref: 'refs/heads/main', object: { sha: 'def456' } })
        } else {
          this.status = 404
          this.responseText = JSON.stringify({ message: 'Not Found' })
        }
      } else if (this._url.includes('/git/refs') && this._method === 'POST') {
        // Create branch
        const bodyObj = body ? JSON.parse(body) : {}
        if (bodyObj.ref && bodyObj.sha) {
          this.status = 201
          this.responseText = JSON.stringify({ ref: bodyObj.ref, object: { sha: bodyObj.sha } })
        } else {
          this.status = 422
          this.responseText = JSON.stringify({ message: 'Reference already exists' })
        }
      } else if (this._url.includes('/contents/') && this._method === 'GET') {
        // Get file SHA
        if (this._url.includes('existing-file.json')) {
          this.status = 200
          this.responseText = JSON.stringify({ sha: 'file123', content: 'base64content' })
        } else if (this._url.includes('special%20chars.json')) {
          // Test URL encoding
          this.status = 200
          this.responseText = JSON.stringify({ sha: 'special123' })
        } else {
          this.status = 404
          this.responseText = JSON.stringify({ message: 'Not Found' })
        }
      } else if (this._url.includes('/contents/') && this._method === 'PUT') {
        // Upload file
        const bodyObj = body ? JSON.parse(body) : {}
        if (bodyObj.message && bodyObj.content && bodyObj.branch) {
          this.status = 201
          this.responseText = JSON.stringify({ 
            content: { sha: 'newfile123' },
            commit: { sha: 'commit789' }
          })
        } else {
          this.status = 400
          this.responseText = JSON.stringify({ message: 'Bad Request' })
        }
      }

      if (this.onreadystatechange) {
        this.onreadystatechange(new Event('readystatechange') as ProgressEvent)
      }
      if (this.onload) {
        this.onload(new Event('load') as ProgressEvent)
      }
    }, 0)
  }

  getResponseHeader (_header: string): string | null {
    return null
  }
}

// Replace global XMLHttpRequest
(global as any).XMLHttpRequest = MockXMLHttpRequest

describe('GithubRepository', () => {
  let repository: GithubRepository
  let mockRequestBody: urlExportRequestBody
  let mockSettings: urlExportSettings

  beforeEach(() => {
    repository = new GithubRepository({
      owner: 'test-owner',
      repo: 'test-repo',
      token: 'test-token'
    })

    mockRequestBody = {
      event_type: 'test',
      client_payload: {
        tokens: '{"color": "red"}',
        filename: 'tokens.json',
        commitMessage: 'Update tokens'
      }
    }

    mockSettings = {
      url: 'https://api.github.com',
      accessToken: 'test-token',
      acceptHeader: 'application/vnd.github+json',
      contentType: 'application/json',
      authType: 'bearer',
      reference: 'test-branch'
    }
  })

  describe('constructor', () => {
    test('should initialize with correct properties', () => {
      expect(repository.owner).toBe('test-owner')
      expect(repository.repo).toBe('test-repo')
      expect(repository.token).toBe('test-token')
    })
  })

  describe('upload', () => {
    test('should successfully upload to existing branch with new file', async () => {
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      // Wait for async operations
      await delay(50)

      expect(onError).not.toHaveBeenCalled()
      expect(onLoaded).toHaveBeenCalled()
    })

    test('should successfully upload to existing branch with existing file', async () => {
      mockRequestBody.client_payload.filename = 'existing-file.json'
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      expect(onError).not.toHaveBeenCalled()
      expect(onLoaded).toHaveBeenCalled()
    })

    test('should create branch and upload when branch does not exist', async () => {
      mockSettings.reference = 'new-branch'
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      expect(onError).not.toHaveBeenCalled()
      expect(onLoaded).toHaveBeenCalled()
    })

    test('should use default commit message when not provided', async () => {
      mockRequestBody.client_payload.commitMessage = ''
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      expect(onError).not.toHaveBeenCalled()
      expect(onLoaded).toHaveBeenCalled()
    })

    test('should handle files with special characters in filename', async () => {
      mockRequestBody.client_payload.filename = 'special chars.json'
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      expect(onError).not.toHaveBeenCalled()
      expect(onLoaded).toHaveBeenCalled()
    })
  })

  describe('URL encoding', () => {
    test('should properly encode filepath with special characters', async () => {
      mockRequestBody.client_payload.filename = 'path/to/file with spaces.json'
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      // Should not fail with encoding issues
      expect(onError).not.toHaveBeenCalled()
    })

    test('should properly encode filepath with unicode characters', async () => {
      mockRequestBody.client_payload.filename = 'tokens/デザイン.json'
      const onError = jest.fn()
      const onLoaded = jest.fn()

      await repository.upload(
        mockRequestBody,
        mockSettings,
        { onError, onLoaded }
      )

      await delay(50)

      // Should not fail with encoding issues
      expect(onError).not.toHaveBeenCalled()
    })
  })
})
