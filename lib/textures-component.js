/* jshint strict: true */

define(['angular'], function(angular) {
  'use strict';
  return angular.module('textures-component', [])
    .directive('textures', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          src: '@',
        },
        controller: function() { },
        templateUrl: 'templates/textures.html',
        replace: true,
      };
    })
  ;
});
