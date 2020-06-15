module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['prettier', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    camelcase: 'off',
  },
};
