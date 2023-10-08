module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=
     */
    eqeqeq: [2, 'allow-null'],
    // 允许使用自增、自减
    allowForLoopAfterthoughts: 'off',
    'no-plusplus': 'off',
    // 可以更改函数入参
    'no-param-reassign': 'off',
    // 允许使用require
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        vue: 'always',
        png: 'aways',
        less: 'aways'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 临时解决vue3的api自动导入报错
    'no-undef': 0,
    // 'no-unused-vars': 'off'
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        tabSize: 2
      }
    ],
    'import/prefer-default-export': 'off'
  }
}
