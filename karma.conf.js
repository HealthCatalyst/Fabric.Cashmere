/* eslint-disable @typescript-eslint/no-var-requires */
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

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
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        reporters: ['progress', 'kjhtml', 'junit'],

        coverageReporter: {
            dir: require('path').join(__dirname, 'test-results/coverage'),
            subdir: '.',
            includeAllSources: true,
            reporters: [{type: 'html'}, {type: 'cobertura', file: 'cobertura.xml'}, {type: 'text-summary', file: 'summary.txt'}]
        },
        junitReporter: {
            outputDir: require('path').join(__dirname, 'test-results'),
            outputFile: 'test-results.xml',
            useBrowserName: false
        },

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--no-sandbox',
                    // Without a remote debugging port, Google Chrome exits immediately.
                    '--remote-debugging-port=9222'
                ]
            }
        },
        singleRun: false
    });
};
