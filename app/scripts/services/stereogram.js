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
      for(var row_idx=0; row_idx<destData.height; ++row_idx) {
        var texRowOffset = (row_idx % textureData.height) * 4 * textureData.width;
        var depthRowOffset = (row_idx % depthData.height) * 4 * depthData.width;
        var destRowOffset = row_idx * 4 * destData.width;

        for(var col_idx=0; col_idx<destData.width; ++col_idx) {
          if(col_idx < leftMargin) {
            for(i=0; i<4; ++i) {
              destData.data[destRowOffset + col_idx*4 + i] =
                textureData.data[texRowOffset + (col_idx % textureData.width)*4 + i];
            }
          } else {
            var depth = depthData.data[
              depthRowOffset + ((col_idx - leftMargin) % depthData.width)*4];

            // Rescale depth from 0 -> maxDepthOffset
            depth *= maxDepthOffset / 255;

            var offset = Math.floor(leftMargin - depth);
            for(i=0; i<4; ++i) {
              destData.data[destRowOffset + col_idx*4 + i] =
                destData.data[destRowOffset + (col_idx - offset)*4 + i];
            }
          }
        }
      }
    };

    return service;
  });
