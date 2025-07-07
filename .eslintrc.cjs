module.exports = {
  extends: ['expo', 'expo/node'],
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        // Essential TypeScript rules
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        
        // Code quality rules that work well with Expo
        'prefer-const': 'error',
        'no-var': 'error',
        'no-console': 'warn',
      },
    },
  ],
  rules: {
    // General rules for all file types
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    'no-duplicate-imports': 'error',
  },
}; 