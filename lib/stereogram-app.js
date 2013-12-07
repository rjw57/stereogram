/* jshint strict: true */

define(['angular', 'lib/magiceye'], function(angular, stereogram) {
  'use strict';

  return angular.module('stereogram-app', ['textures-component'])
    .controller('StereogramCtrl', ['$scope', function($scope) {
      $scope.stereogramUrl = '';
      $scope.textureUrl = '';
      $scope.depthImageUrl = 'img/depth/bottles.jpg';

      // image elements which will contain the current texture and depth image
      var texImage = document.createElement('img');
      var depthImage = document.createElement('img');

      texImage.onload = depthImage.onload = function() {
        if(!texImage.complete || !depthImage.complete) return;
        $scope.stereogramUrl = stereogram.render(depthImage, texImage);

        // Need to call $digest because the onload almost certainly happens
        // outside of Angular's event loop.
        $scope.$digest();
      };

      $scope.$watch('textureUrl', function(v) { texImage.src = v; });
      $scope.$watch('depthImageUrl', function(v) { depthImage.src = v; });
    }])
  ;
});
