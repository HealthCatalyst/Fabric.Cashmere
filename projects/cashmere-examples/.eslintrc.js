module.exports = {
    extends: ['../../.eslintrc.js'],
    rules: {
        '@angular-eslint/component-class-suffix': 'off',
        '@angular-eslint/directive-class-suffix': 'off',
        '@angular-eslint/component-selector': [
            'error',
            {
                type: 'element',
                prefix: '',
                style: 'kebab-case'
            }
        ],
        '@angular-eslint/directive-selector': [
            'error',
            {
                type: 'attribute',
                prefix: '',
                style: 'camelCase'
            }
        ]
    }
};
