export type urlExportData = {
  url: string,
  accessToken: string,
  acceptHeader: string,
  authType: string,
  data: {
    'event_type': string,
    'client_payload': {
      tokenFileName: string,
      tokens: string,
      filename: string
    }
  }
}
