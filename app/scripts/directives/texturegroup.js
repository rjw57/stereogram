'use strict';

angular.module('stereogramApp')
  .directive('texturegroup', function() {
    return {
      scope: { ngModel: '=?' },
      restrict: 'EA',
      template:
        '<div class="texture-group container">' +
          '<div class="row" ng-transclude></div>' +
        '</div>',
      transclude: true,
      controller: function($scope) {
        var textures = $scope.textures = [];

        var select = function(tex) {
          angular.forEach(textures, function(t) {
            t.selected = false;
          });
          tex.selected = true;
          $scope.ngModel = tex.src;
        };

        this.addTexture = function(tex) {
          if((textures.length === 0) || tex.selected) { select(tex); }
          textures.push(tex);
          tex.$watch('selected', function(v) {
            if(v) { select(tex); }
          });
        };
      },
    };
  })
  .directive('texture', function() {
    return {
      scope: { src: '@' },
      restrict: 'EA',
      require: '^texturegroup',
      template:
        '<div class="texture" ng-class="{selected: selected}">' +
          '<a href="" ng-click="selected = true"><div class="texture-frame">' +
            '<div class="texture-swatch" style="background-image: url({{ src }})">' +
          '</div></a>' +
        '</div>',
      link: function(scope, element, attrs, textureGroupCtrl) {
        // initialise selected flag
        scope.selected = attrs.selected;
        textureGroupCtrl.addTexture(scope);
      },
    };
  });
