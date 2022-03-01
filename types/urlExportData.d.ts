export type urlExportSettings = {
  url: string,
  accessToken: string,
  acceptHeader: string,
  authType: string,
  contentType: string,
  ref: string
}

export type urlExportRequestBody = {
  'event_type': string,
  'client_payload': {
    tokens: string,
    filename: string
  }
}
