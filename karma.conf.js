const webpackConfig = require('./webpack.config.js');
webpackConfig.devtool =  'inline-source-map';

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,

    reporters: ['mocha'],

    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
