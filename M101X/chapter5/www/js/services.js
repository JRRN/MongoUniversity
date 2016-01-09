angular.module('starter.services', [])

.factory('$routeParams', function($stateParams) {
  return $stateParams;
})

.factory('$facebookLogin', function($user, $window) {
  return function() {
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
        $user.loadUser();
      }
    });

    // For Ionic serve workflow
    ref.onload = function(ev) {
      ref.close();
      $user.loadUser();
    };
  };
});
