// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['templates', 'mean-retail.components',
  'ionic', 'starter.controllers', 'starter.services'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(req) {
        // Transform **all** $http calls so that requests that go to `/`
        // instead go to a different origin, in this case localhost:3000
        if (req.url.charAt(0) === '/') {
          req.url = 'http://localhost:3000' + req.url;
          req.withCredentials = true;
        }

        return req;
      }
    };
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '',
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.categories', {
    url: '/categories',
    views: {
      'tab-category': {
        templateUrl: 'templates/tab-categories.html'
      }
    }
  })

  .state('tab.category', {
    url: '/category/:category',
    views: {
      'tab-category': {
        templateUrl: 'templates/tab-category.html',
        controller: function($scope, $routeParams) {
          $scope.title = $routeParams.category;
        }
      }
    }
  })

  .state('tab.product', {
    url: '/product/:id',
    views: {
      'tab-category': {
        templateUrl: 'templates/tab-product.html'
      }
    }
  })

  .state('tab.user', {
    url: '/me',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller: function($scope, $facebookLogin, $user) {
          $scope.user = $user;
          $scope.facebookLogin = $facebookLogin;
        }
      }
    }
  })

  // TODO: add 'tab.search' here
  .state('tab.search', {
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/categories');

})

;
