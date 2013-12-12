'use strict';

angular.module('stereogramApp')
  .directive('texturegroup', function() {
    return {
      scope: { },
      template:
        '<div class="texture-group container">' +
          '<div class="row" ng-transclude></div>' +
        '</div>',
      transclude: true,
    };
  })
  .directive('texture', function() {
    return {
      scope: { src: '@' },
      template:
        '<div class="texture" ng-class="{selected: selected}">' +
          '<a href="" ng-click="selected = true"><div class="texture-frame">' +
            '<div class="texture-swatch" style="background-image: url({{ src }})">' +
          '</div></a>' +
        '</div>',
    };
  });
