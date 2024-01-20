module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-var-requires': false,
  },
}