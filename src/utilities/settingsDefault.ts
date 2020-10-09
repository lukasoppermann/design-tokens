// settings structure & default values
export default {
  settings: {
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
    }
  },
  privateSettings: {
    sendToUrl: {
      default: false,
      empty: false
    },
  }
}