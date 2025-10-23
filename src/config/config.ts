/* istanbul ignore file */
export default {
  ui: {
    generalSettings: {
      width: 550,
      height: 836
    },
    export: {
      width: 550,
      height: 356
    },
    urlExport: {
      width: 550,
      height: 650
    }
  },
  key: {
    lastVersionSettingsOpened: 'lastVersionSettingsOpened',
    fileId: 'fileId',
    settings: 'settings',
    extensionPluginData: 'org.lukasoppermann.figmaDesignTokens',
    extensionFigmaStyleId: 'styleId',
    extensionVariableStyleId: 'variableId',
    extensionAlias: 'alias',
    authType: {
      token: 'token',
      gitlabToken: 'gitlab_token',
      gitlabCommit: 'gitlab_commit',
      githubCommit: 'github_commit',
      basic: 'Basic',
      bearer: 'Bearer'
    }
  },
  exclusionPrefixDefault: ['_', '.'],
  fileExtensions: [
    {
      label: '.tokens.json',
      value: '.tokens.json'
    },
    {
      label: '.tokens',
      value: '.tokens'
    },
    {
      label: '.json',
      value: '.json'
    }
  ]
}
