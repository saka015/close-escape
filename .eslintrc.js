module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Turn these specific errors into warnings
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
}; 