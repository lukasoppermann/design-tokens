export type urlExportSettings = {
  url: string,
  accessToken: string,
  acceptHeader: string,
  authType: string
}

export type urlExportRequestBody = {
  'event_type': string,
  'client_payload': {
    tokenFileName: string,
    tokens: string,
    filename: string
  }
}
