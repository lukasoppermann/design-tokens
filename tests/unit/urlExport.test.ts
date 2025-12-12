import { _testing, urlExport } from '@ui/modules/urlExport'
import { urlExportRequestBody, urlExportSettings } from '@typings/urlExportData'
import config from '@config/config'
import { GithubRepository } from '@ui/modules/githubRepository'

// Mock GithubRepository
jest.mock('@ui/modules/githubRepository', () => {
    return {
        GithubRepository: jest.fn().mockImplementation(() => {
            return {
                upload: jest.fn()
            }
        })
    }
})

function FormDataMock() {
    this.append = jest.fn()
}

(global as any).FormData = FormDataMock

describe('Testing urlExport', () => {
    let mockUrlExportSettings
    let mockUrlExportRequestBody

    beforeEach(() => {
        mockUrlExportSettings = {
            'url': 'https://test.com',
            'accessToken': 'test',
            'acceptHeader': 'baseHeader',
            'contentType': 'text',
            'authType': 'baseAuthType',
            'reference': 'main'
        } as urlExportSettings
        mockUrlExportRequestBody = {
            'event_type': 'baseEvent',
            'client_payload': {
                'tokens': '',
                'filename': 'myBaseFile.json',
                'commitMessage': ''
            }
        } as urlExportRequestBody
    })

    describe('generateRequestBody testing', () => {
        test('If token is set to anything but gitlab_token body is of type string',
            () => {
                const body = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody)
                expect(typeof body).toBe('string')
            })

        test('If token is set to gitlab_token body is of type form data',
            () => {
                mockUrlExportSettings.authType = config.key.authType.gitlabToken
                const body = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody)
                expect(body).toBeInstanceOf(FormData)
            })

        test('If token is set to gitlab_token and values are changed body is of type form data with correct values',
            () => {
                mockUrlExportSettings.authType = config.key.authType.gitlabToken

                const accessToken = 'access token'
                mockUrlExportSettings.accessToken = accessToken

                const reference = 'test/branch'
                mockUrlExportSettings.reference = reference

                const event_type = 'new event'
                mockUrlExportRequestBody.event_type = event_type

                const payloadTokens = '{\'name\':\'John\', \'age\':30, \'car\':null}'
                mockUrlExportRequestBody.client_payload.tokens = payloadTokens

                const payloadFilename = 'file.new'
                mockUrlExportRequestBody.client_payload.filename = payloadFilename

                const payloadCommitMessage = 'feat(tokens): Some tokens were added.'
                mockUrlExportRequestBody.client_payload.commitMessage = payloadCommitMessage


                const body = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody) as any
                expect(body.append).toHaveBeenCalledWith('token', accessToken)
                expect(body.append).toHaveBeenCalledWith('token', accessToken)
                expect(body.append).toHaveBeenCalledWith('ref', reference)
                expect(body.append).toHaveBeenCalledWith('variables[FIGMA_EVENT_TYPE]', event_type)
                expect(body.append).toHaveBeenCalledWith('variables[FIGMA_CLIENT_PAYLOAD_TOKENS]', payloadTokens)
                expect(body.append).toHaveBeenCalledWith('variables[FIGMA_CLIENT_PAYLOAD_FILENAME]', payloadFilename)
                expect(body.append).toHaveBeenCalledWith('variables[FIGMA_CLIENT_PAYLOAD_COMMIT_MESSAGE]', payloadCommitMessage)
            })

        test('If a commit message is included, it is in the client_payload',
            () => {
                const payloadCommitMessage = 'feat(tokens): Some tokens were added.'
                mockUrlExportRequestBody.client_payload.commitMessage = payloadCommitMessage

                const bodyString = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody) as any
                const body = JSON.parse(bodyString)
                expect(body.client_payload).toHaveProperty('commitMessage')
                expect(body.client_payload.commitMessage).toStrictEqual(payloadCommitMessage)
            })

    })

    describe('addUrlExportRequestHeaders testing', () => {

        test('Setting token to gitlab_token results in no change to the headers',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                mockUrlExportSettings.authType = config.key.authType.gitlabToken

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).not.toHaveBeenCalledWith()
            })

        test('Adding an Accept value adds the accept header',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest


                const acceptHeader = 'application/JSON'
                mockUrlExportSettings.acceptHeader = acceptHeader

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).toHaveBeenCalledWith(_testing.ACCEPT_HEADER_KEY, acceptHeader)
            })

        test('Not adding an Accept value sets default value for Accept header',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                mockUrlExportSettings.acceptHeader = null

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).toHaveBeenCalledWith(_testing.ACCEPT_HEADER_KEY, 'application/vnd.github.everest-preview+json')
            })


        test('Adding a content type adds the new value to the content type header',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest


                const contentType = 'application/JSON'
                mockUrlExportSettings.contentType = contentType

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).toHaveBeenCalledWith(_testing.CONTENT_TYPE_HEADER_KEY, contentType)
            })

        test('Not adding a content type sets default value for Content Type header',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                mockUrlExportSettings.contentType = null

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).toHaveBeenCalledWith(_testing.CONTENT_TYPE_HEADER_KEY, 'text/plain;charset=UTF-8')
            })

        test('Adding an accessToken and authType adds the Authorization header',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                const accessToken = 'token'
                const authType = 'type'
                mockUrlExportSettings.accessToken = accessToken
                mockUrlExportSettings.authType = authType

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).toHaveBeenCalledWith(_testing.AUTHORIZATION_HEADER_KEY, `${authType} ${accessToken}`)
            })

        test('Not adding an accessToken results in no change to the headers',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                const accessToken = null
                const authType = 'type'
                mockUrlExportSettings.accessToken = accessToken
                mockUrlExportSettings.authType = authType

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).not.toHaveBeenCalledWith(_testing.AUTHORIZATION_HEADER_KEY)
            })

        test('Not adding an authType results in no change to the headers',
            () => {
                const request = {
                    setRequestHeader: jest.fn()
                } as any as XMLHttpRequest

                const accessToken = 'token'
                const authType = null
                mockUrlExportSettings.accessToken = accessToken
                mockUrlExportSettings.authType = authType

                _testing.addUrlExportRequestHeaders(request, mockUrlExportSettings)
                expect(request.setRequestHeader).not.toHaveBeenCalledWith(_testing.AUTHORIZATION_HEADER_KEY)
            })

    })

    describe('urlExport with githubCommit auth type', () => {
        let mockRequestBody: urlExportRequestBody
        let mockExportSettings: urlExportSettings
        let mockParent: any

        beforeEach(() => {
            jest.clearAllMocks()

            mockRequestBody = {
                'event_type': 'testEvent',
                'client_payload': {
                    'tokens': '{"colors": "red"}',
                    'filename': 'tokens.json',
                    'commitMessage': 'Update tokens'
                }
            } as urlExportRequestBody

            mockExportSettings = {
                'url': '',
                'accessToken': 'ghp_testtoken123',
                'acceptHeader': null,
                'contentType': null,
                'authType': config.key.authType.githubCommit,
                'reference': 'main'
            } as urlExportSettings

            mockParent = {
                postMessage: jest.fn()
            }
        })

        test('parses API URL format (repos/owner/repo)', () => {
            mockExportSettings.url = 'https://api.github.com/repos/testowner/testrepo'

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(GithubRepository).toHaveBeenCalledWith({
                owner: 'testowner',
                repo: 'testrepo',
                token: 'ghp_testtoken123'
            })
        })

        test('parses web URL format (github.com/owner/repo)', () => {
            mockExportSettings.url = 'https://github.com/myorg/myrepo'

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(GithubRepository).toHaveBeenCalledWith({
                owner: 'myorg',
                repo: 'myrepo',
                token: 'ghp_testtoken123'
            })
        })

        test('calls upload method with requestBody and exportSettings', () => {
            mockExportSettings.url = 'https://github.com/testowner/testrepo'

            const mockUpload = jest.fn()
            ;(GithubRepository as jest.Mock).mockImplementation(() => ({
                upload: mockUpload
            }))

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(mockUpload).toHaveBeenCalledTimes(1)
            expect(mockUpload).toHaveBeenCalledWith(
                mockRequestBody,
                mockExportSettings,
                expect.objectContaining({
                    onError: expect.any(Function),
                    onLoaded: expect.any(Function)
                })
            )
        })

        test('handles URL with trailing slash', () => {
            mockExportSettings.url = 'https://github.com/testowner/testrepo/'

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(GithubRepository).toHaveBeenCalledWith({
                owner: 'testrepo',
                repo: '',
                token: 'ghp_testtoken123'
            })
        })

        test('creates GithubRepository instance', () => {
            mockExportSettings.url = 'https://github.com/testowner/testrepo'

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(GithubRepository).toHaveBeenCalledTimes(1)
        })

        test('passes access token to GithubRepository', () => {
            mockExportSettings.url = 'https://github.com/testowner/testrepo'
            const customToken = 'ghp_customtoken456'
            mockExportSettings.accessToken = customToken

            urlExport(mockParent, mockExportSettings, mockRequestBody)

            expect(GithubRepository).toHaveBeenCalledWith(
                expect.objectContaining({
                    token: customToken
                })
            )
        })
    })
})
