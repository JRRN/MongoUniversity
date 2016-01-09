var rootElement = angular.element(document);

var m = angular.module('ionic', ['ng']);

m.provider({
  $rootElement: function() {
    this.$get = function() {
       return rootElement;
    };
  }
});

m.factory('$ionicPlatform', function() {
  return {
    ready: function() {}
  };
});

m.provider('$urlRouter', function() {
  this.$get = function() {
    return {};
  };

  this.otherwise = function() {};
});

m.directive('ionView', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div><ng-transclude></ng-transclude></div>'
  };
});

m.directive('ionContent', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<ng-transclude></ng-transclude>'
  };
});

m.provider('$state', function() {
  var calls = [];
  this.$get = function() {
    var ret = {};

    ret.calls = function() {
      return calls;
    };

    return ret;
  };

  this.state = function(name, props) {
    calls.push({ name: name, props: props });
    return this;
  };
});