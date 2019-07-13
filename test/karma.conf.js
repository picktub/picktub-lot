const babelConfig = require('../babel.config');

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    files: ['../src/**/*.spec.js'],
    reporters: ['spec'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    preprocessors: {
      '../src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: babelConfig.presets,
                plugins: babelConfig.plugins,
              },
            },
          },
        ],
      },
      mode: 'production',
    },
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  });
};
