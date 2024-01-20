module.exports = {
  root: true,
  env: {
    es2016: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-var-requires': false,
  },
}