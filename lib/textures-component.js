/* jshint strict: true */

define(['angular'], function(angular) {
  'use strict';
  return angular.module('textures-component', [])
    .directive('textures', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: { },
        controller: function() { },
        templateUrl: 'templates/textures.html',
        replace: true,
      };
    })
    .directive('texture', function() {
      return {
        require: '^textures',
        restrict: 'E',
        transclude: true,
        scope: { },
        controller: function() { },
        templateUrl: 'templates/texture.html',
        replace: true,
      };
    })
  ;
});
