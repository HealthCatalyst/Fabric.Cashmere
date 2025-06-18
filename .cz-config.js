console.log(">>> Loaded .cz-config.js");

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'docs', name: 'docs:     Documentation only' },
    { value: 'style', name: 'style:    Code style (formatting, etc)' },
    { value: 'refactor', name: 'refactor: Code changes without new features or bugfixes' },
    { value: 'perf', name: 'perf:     Performance improvement' },
    { value: 'test', name: 'test:     Adding or fixing tests' },
    { value: 'build', name: 'build:    Build system or dependencies' },
    { value: 'ci', name: 'ci:       CI config changes' },
    { value: 'chore', name: 'chore:    Other changes (like tool config)' },
    { value: 'revert', name: 'revert:   Revert a commit' }
  ],
  allowCustomScopes: true,
  scopes: [
    { name: 'api' },
    { name: 'core' },
    { name: 'ui' }
  ],
  scopeOverrides: {
    feat: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    fix: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    docs: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    style: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    refactor: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    perf: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    test: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    build: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    ci: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    chore: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }],
    revert: [{ name: 'api' }, { name: 'core' }, { name: 'ui' }]
  },
  messages: {
    scope: 'What is the scope of this change (e.g. component or file name):'
  },
};
