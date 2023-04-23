// Karma configuration
// Generated on Sat Feb 12 2022 22:08:51 GMT-0500 (Eastern Standard Time)
//process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './src/app/',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      //require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-nyan-reporter'),
      require('karma-jasmine-html-reporter'),
    ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: '**/*.ts', type: 'js' },
      { pattern: '**/*.spec.ts', type: 'js' }
    ],

    mime: {
      'text/x-typescript': ['ts']
    },

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['nyan'],

    
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
