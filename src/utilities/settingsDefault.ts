/* istanbul ignore file */
// settings structure & default values
export default {
  filename: {
    default: 'design-tokens',
    empty: false
  },
  extension: {
    default: '.json',
    empty: false
  },
  nameConversion: {
    default: 'default',
    empty: false
  },
  compression: {
    default: false,
    empty: false
  },
  urlJsonCompression: {
    default: true,
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
  },
  keyInName: {
    default: false,
    empty: false
  },
  exports: {
    default: {
      color: true,
      font: true,
      effect: true,
      grid: true,
      border: true,
      breakpoint: true,
      radius: true,
      size: true,
      spacing: true,
      motion: true
    },
    empty: false
  }
}
