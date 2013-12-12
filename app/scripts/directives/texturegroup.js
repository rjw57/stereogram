'use strict';

angular.module('stereogramApp')
  .directive('texturegroup', function() {
    return {
      restrict: 'E',
      replace: false,
      scope: { },
      template: '<div class="texture-group" ng-transclude></div>',
      transclude: true,
    };
  });
