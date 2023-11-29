module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:react/jsx-runtime'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/state-in-constructor': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': 'off',
    'class-methods-use-this': ['off', { exceptMethods: ['formatDate'], enforceForClassFields: false }],
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'enforce',
        custom: 'ignore',
      },
    ],
  },
};
