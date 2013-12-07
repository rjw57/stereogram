/* jshint strict: true */

define(['angular', 'lib/stereogram'], function(angular, stereogram) {
  'use strict';

  return angular.module('stereogram-app', ['textures-component'])
    .controller('StereogramCtrl', ['$scope', function($scope) {
      $scope.stereogramUrl = '';
      $scope.textureUrl = '';
      $scope.depthImageUrl = 'img/depth/bottles.jpg';

      var updateStereogram = function() {
        // Do nothing if not all images are specified
        if(($scope.depthImageUrl === '') || ($scope.textureUrl === '')) return;

        stereogram.render($scope.depthImageUrl, $scope.textureUrl, function(err, sgUrl) {
          if(err) return;

          // Need to call $digest because this almost certainly happens
          // outside of Angular's event loop.
          $scope.stereogramUrl = sgUrl;
          $scope.$digest();
        });
      };

      $scope.$watch('textureUrl', updateStereogram );
      $scope.$watch('depthImageUrl', updateStereogram );
    }])
  ;
});
