/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
