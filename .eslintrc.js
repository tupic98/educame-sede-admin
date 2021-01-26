module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-redeclare': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'lines-between-class-members': 'off',
    'import/no-named-as-default': 'off',
  },
};
