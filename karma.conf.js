/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-spec-reporter')
    ],
    client: {
      captureConsole: true,
      clearContext: false,
      jasmine: {
        random: false,
        timeoutInterval: 15000
      }
    },
    reporters: ['spec', 'progress', 'kjhtml', 'junit'],
    coverageReporter: {
      dir: require('path').join(__dirname, 'test-results/coverage'),
      subdir: '.',
      includeAllSources: true,
      reporters: [
        { type: 'html' },
        { type: 'cobertura', file: 'cobertura.xml' },
        { type: 'text-summary', file: 'summary.txt' }
      ]
    },

    junitReporter: {
      outputDir: require('path').join(__dirname, 'test-results'),
      outputFile: 'test-results.xml',
      useBrowserName: false
    },
    specReporter: {
      suppressPassed: false,
      suppressSkipped: true,
      suppressFailed: false,
      showSpecTiming: true
    },
    port: 9876,
    colors: true,
    logLevel: config.INFO,
    autoWatch: true,
    singleRun: false,

    // keep these high to prevent "full page reload" warnings in watch mode
    browserDisconnectTimeout: 30000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 300000,
    captureTimeout: 120000,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--remote-debugging-port=9222'
        ]
      }
    }
  });
};
