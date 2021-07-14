module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@angular-eslint', '@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    ignorePatterns: ['node_modules/**', 'dist/**', 'tools/**', 'scripts/**', '**/*.generated.ts'],
    rules: {
        '@angular-eslint/component-selector': [
            'error',
            {
                type: 'element',
                prefix: 'hc',
                style: 'kebab-case'
            }
        ],
        '@angular-eslint/directive-selector': [
            'error',
            {
                type: 'attribute',
                prefix: 'hc',
                style: 'camelCase'
            }
        ]
    }
};
