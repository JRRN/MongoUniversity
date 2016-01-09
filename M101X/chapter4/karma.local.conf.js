module.exports = function(config) {
  config.set({
    files: [
      'http://code.jquery.com/jquery-1.11.3.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
      // For ngMockE2E
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-mocks.js',
      './bin/index.js',
      './test.js',
      { pattern: './templates/*.html', included: false, served: true }
    ],
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome'],
    port: 9876,
    proxies : {
      '/assessment': 'http://localhost:9876/base/'
    }
  });
};
