/* jshint strict: true */

define(['angular'], function(angular) {
  'use strict';
  return angular.module('textures-component', [])
    .directive('textures', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {
          ngModel: '=',
        },
        controller: ['$scope', function($scope) {
          var textures = $scope.textures = [];
          $scope.ngModel = null;

          $scope.select = function(texture) {
            angular.forEach(textures, function(t) {
              t.selected = false;
            });
            texture.selected = true;
            $scope.ngModel = texture.src;
          };

          this.addTexture = function(texture) {
            if(textures.length === 0) $scope.select(texture);
            textures.push(texture);

            texture.$watch('selected', function() { if(texture.selected) $scope.select(texture); });
          };
        }],
        templateUrl: 'templates/textures.html',
      };
    })
    .directive('texture', function() {
      return {
        require: '^textures',
        restrict: 'E',
        transclude: true,
        scope: {
          src: '@',
        },
        controller: ['$scope', function($scope) {
        }],
        link: function(scope, element, attrs, texturesCtrl) {
          texturesCtrl.addTexture(scope);
          scope.textures = texturesCtrl;
        },
        templateUrl: 'templates/texture.html',
      };
    })
  ;
});
