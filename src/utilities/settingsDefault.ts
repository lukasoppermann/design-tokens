/* istanbul ignore file */
// settings structure & default values
export default {
  filename: {
    default: 'design-tokens',
    empty: false
  },
  excludePrefix: {
    default: true,
    empty: false
  },
  prefix: {
    default: '_',
    empty: false
  },
  serverUrl: {
    default: '',
    empty: true
  },
  eventType: {
    default: 'update-tokens',
    empty: false
  },
  acceptHeader: {
    default: 'application/vnd.github.everest-preview+json',
    empty: true
  },
  authType: {
    default: 'token',
    empty: false
  }
}
