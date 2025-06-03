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
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-spec-reporter')
        ],
        client: {
            captureConsole: true, // Capture console output from tests
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                random: false, // Disable random test order to make debugging easier
                timeoutInterval: 5000 // Set a timeout interval for tests

            }
        },

        reporters: ['spec', 'progress', 'kjhtml', 'junit'],

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
        specReporter: {
            suppressPassed: false,  // print passed tests
            suppressSkipped: true,
            suppressFailed: false,
            showSpecTiming: true
        },
        port: 9876,
        colors: true,
        logLevel: config.INFO,
        autoWatch: true,
        captureTimeout: 60000,         // time to wait for a browser to start (default: 60000)
        browserDisconnectTimeout: 5000, // time to wait after disconnect
        browserDisconnectTolerance: 2,   // retry disconnects
        browserNoActivityTimeout: 30000,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--no-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--disable-setuid-sandbox',
                    '--remote-debugging-port=9222'
                ]
            }
        },
        singleRun: false
    });
};
