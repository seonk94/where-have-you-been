module.exports = {
  root : true,
  parser : '@typescript-eslint/parser',
  parserOptions : {
    ecmaVersion : 2019,
    sourceType : 'module',
    ecmaFeatures : {
      jsx : true
    }
  },
  plugins : ['@typescript-eslint', 'react-hooks'],
  extends : [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended'
  ],
  env : {
    browser : true
  },
  rules : {
    indent : ['error', 2],
    semi : ['error', 'always'],
    quotes : ['error', 'single', { allowTemplateLiterals : true }],
    'import/no-unresolved' : 'off',
    'comma-dangle' : ['error', 'never'],
    '@typescript-eslint/no-unused-vars' : 'off',
    '@typescript-eslint/explicit-module-boundary-types' : 'off',
    'comma-spacing' : ['error', { before : false, after : true }],
    'arrow-spacing' : ['error', { before : true, after : true }],
    'no-whitespace-before-property' : 'error',
    'key-spacing' : ['error', { beforeColon : true, afterColon : true }]
  }
};
