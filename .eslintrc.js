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
        ],
        // The docs site uses webpack's require() to bundle markdown content for routes/services.
        // These are deliberate asset loads, not module imports, so the typescript-eslint v8
        // default for this rule does not apply.
        '@typescript-eslint/no-require-imports': 'off'
    }
};
