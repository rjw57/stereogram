angular.module('stereogramApp')
  .factory('$stereogram', function() {
    var service = {};

    service.renderIntoImageData = function(depthData, textureData, destData, options) {
      options = angular.extend({ maxDepthOffset: 64 }, options);
    };

    return service;
  });
