angular.module('starter.controllers', [])

.controller('DashCtrl', function($window, $scope, $http) {
  $scope.load = function() {
    $http.get('/api/v1/me').success(function(data) {
      $scope.data = data;
    });
  };

  $scope.login = function() {
    var url = 'http://localhost:3000/auth/facebook';
    if ($window.cordova) {
      url += '?redirect=' +
        encodeURIComponent('http://i.imgur.com/XseoGPD.png');
    } else {
      url += '?redirect=' + encodeURIComponent(window.location.href);
    }

    var ref = window.open(url, '_blank', 'location=no');

    // For Cordova
    ref.addEventListener('loadstop', function(ev) {
      if (ev.url.indexOf('/auth/facebook') === -1) {
        ref.close();
        $scope.load();
      }
    });

    // For Ionic serve workflow
    ref.onload = function(ev) {
      ref.close();
      $scope.load();
    };
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
