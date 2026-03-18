const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const figmaPlugin = require('@figma/eslint-plugin-figma-plugins')

const globals = {
  jest: 'readonly',
  test: 'readonly',
  expect: 'readonly',
  __html__: 'readonly',
  parent: 'readonly',
  onmessage: 'writable',
  UIAPI: 'readonly',
  figma: 'readonly',
  PluginAPI: 'readonly',
  PaintStyle: 'readonly',
  GridStyle: 'readonly',
  TextStyle: 'readonly',
  LayoutGrid: 'readonly',
  FrameNode: 'readonly',
  SceneNode: 'readonly',
  PageNode: 'readonly',
  RectangleNode: 'readonly',
  ComponentSetNode: 'readonly',
  ComponentNode: 'readonly',
  GridLayoutGrid: 'readonly',
  RowsColsLayoutGrid: 'readonly',
  EffectStyle: 'readonly',
  Effect: 'readonly',
  Paint: 'readonly',
  Transition: 'readonly',
  Easing: 'readonly',
  DirectionalTransition: 'readonly',
  window: 'readonly',
  document: 'readonly',
  console: 'readonly',
  Blob: 'readonly',
  URL: 'readonly',
  FormData: 'readonly',
  XMLHttpRequest: 'readonly',
  ProgressEvent: 'readonly',
  HTMLAnchorElement: 'readonly'
}

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'tests/**',
      'examples/**',
      'types/**',
      '*.config.*'
    ]
  },
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['src/**/*.ts', 'src/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      globals
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@figma/figma-plugins': figmaPlugin
    },
    rules: {
      ...figmaPlugin.configs.recommended.rules,
      'default-param-last': 'off',
      'no-return-assign': 'off',
      'brace-style': 'off',
      'no-use-before-define': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  }
]
