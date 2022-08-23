import {_testing} from '../../src/ui/modules/urlExport'
import {urlExportRequestBody, urlExportSettings} from "../../types/urlExportData";
import config from "../../src/config/config";

function FormDataMock() {
    this.append = jest.fn();
}

(global as any).FormData = FormDataMock

describe('Testing urlExport', () => {
    let mockUrlExportSettings
    let mockUrlExportRequestBody

    beforeEach(() => {
        mockUrlExportSettings = {
            "url": 'https://test.com',
            "accessToken": 'test',
            "acceptHeader": 'baseHeader',
            "contentType": 'text',
            "authType": 'baseAuthType',
            "reference": 'main'
        } as urlExportSettings
        mockUrlExportRequestBody = {
            "event_type": 'baseEvent',
            "client_payload": {
                "tokens": '',
                "filename": 'myBaseFile.json',
                "message": ''
            }
        } as urlExportRequestBody
    })

    describe("generateRequestBody testing", () => {
        test('If token is set to anything but gitlab_token body is of type string',
            () => {
                const body = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody)
                expect(typeof body).toBe("string")
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

                const accessToken = "access token"
                mockUrlExportSettings.accessToken=accessToken

                const reference = "test/branch"
                mockUrlExportSettings.reference=reference

                const event_type = "new event"
                mockUrlExportRequestBody.event_type=event_type

                const payloadTokens = "{'name':'John', 'age':30, 'car':null}"
                mockUrlExportRequestBody.client_payload.tokens=payloadTokens

                const payloadFilename = "file.new"
                mockUrlExportRequestBody.client_payload.filename=payloadFilename

                const payloadMessage = "feat(tokens): Some tokens were added."
                mockUrlExportRequestBody.client_payload.message=payloadMessage


                const body = _testing.generateUrlExportRequestBody(mockUrlExportSettings, mockUrlExportRequestBody) as any
                expect(body.append).toHaveBeenCalledWith("token", accessToken)
                expect(body.append).toHaveBeenCalledWith("token", accessToken)
                expect(body.append).toHaveBeenCalledWith("ref", reference)
                expect(body.append).toHaveBeenCalledWith("variables[FIGMA_EVENT_TYPE]", event_type)
                expect(body.append).toHaveBeenCalledWith("variables[FIGMA_CLIENT_PAYLOAD_TOKENS]", payloadTokens)
                expect(body.append).toHaveBeenCalledWith("variables[FIGMA_CLIENT_PAYLOAD_FILENAME]", payloadFilename)
                expect(body.append).toHaveBeenCalledWith("variables[FIGMA_CLIENT_PAYLOAD_MESSAGE]", payloadMessage)
            })
    })

    describe("addUrlExportRequestHeaders testing", () => {

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
})
