'use strict';

angular.module('stereogramApp')
  .factory('$stereogram', function() {
    var service = {};

    service.renderIntoImageData = function(depthData, textureData, destData, options) {
      options = angular.extend({ maxDepthOffset: 64 }, options);

      var maxDepthOffset = options.maxDepthOffset;

      // Calculate left-most margin
      var leftMargin = Math.max(textureData.width, maxDepthOffset);

      var i;

      // Generate destData
      for(var rowIdx=0; rowIdx<destData.height; ++rowIdx) {
        var texRowOffset = (rowIdx % textureData.height) * 4 * textureData.width;
        var depthRowOffset = (rowIdx % depthData.height) * 4 * depthData.width;
        var destRowOffset = rowIdx * 4 * destData.width;

        for(var colIdx=0; colIdx<destData.width; ++colIdx) {
          if(colIdx < leftMargin) {
            for(i=0; i<4; ++i) {
              destData.data[destRowOffset + colIdx*4 + i] =
                textureData.data[texRowOffset + (colIdx % textureData.width)*4 + i];
            }
          } else {
            var depth = depthData.data[
              depthRowOffset + ((colIdx - leftMargin) % depthData.width)*4];

            // Rescale depth from 0 -> maxDepthOffset
            depth *= maxDepthOffset / 255;

            var offset = Math.floor(leftMargin - depth);
            for(i=0; i<4; ++i) {
              destData.data[destRowOffset + colIdx*4 + i] =
                destData.data[destRowOffset + (colIdx - offset)*4 + i];
            }
          }
        }
      }
    };

    return service;
  });

