/* jshint strict: true */

define(function() {
  'use strict';

  var exports = {};

  var imageDataFromImage = function(img) {
    // Create a canvas element the same size as the image
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw image into canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Get image data from canvas
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  // Given an ImageElement for the depth image and texture image, return a
  // dataURL whose contents represent a magic eye picture.
  exports.render = function(depthImg, textureImg) {
    var maxDepthOffset = 64;

    var imageSize;

    var leftMargin = Math.max(textureImg.naturalWidth, maxDepthOffset);

    // Calculate size of image
    imageSize = { w: depthImg.naturalWidth + leftMargin, h: depthImg.naturalHeight };
    var canvas = document.createElement('canvas');
    canvas.width = imageSize.w;
    canvas.height = imageSize.h;

    // Get image data for the depth and texture images
    var depthData = imageDataFromImage(depthImg);

    var ctx = canvas.getContext('2d');

    // Draw the texture image into the left side of the canvas
    for(var x = 0; x < leftMargin; x += textureImg.naturalWidth) {
      for(var y = 0; y < imageSize.h; y += textureImg.naturalHeight) {
        ctx.drawImage(textureImg, x, y);
      }
    }

    // Get the canvas' image data for writing
    var pixels = ctx.getImageData(0, 0, imageSize.w, imageSize.h);

    // Generate pixels
    for(var row_idx=0; row_idx<imageSize.h; ++row_idx) {
      // Calculate indices into depth and pixel data. Note that we start the pixel
      // row textureImg.naturalWidth pixels in
      var depthRowOffset = row_idx * 4 * depthData.width;
      var pixelsRowOffset = (row_idx * pixels.width + leftMargin) * 4;

      for(var col_idx=0; col_idx<depthImg.naturalWidth; ++col_idx) {
        var depth = depthData.data[depthRowOffset + col_idx*4];

        // Rescale depth from 0 -> maxDepthOffset
        depth *= maxDepthOffset / 255;

        var offset = Math.floor(leftMargin - depth);
        for(var i=0; i<4; ++i) {
          pixels.data[pixelsRowOffset + col_idx*4 + i] = pixels.data[pixelsRowOffset + (col_idx - offset)*4 + i];
        }
      }
    }

    // Copy pixels back to canvas
    ctx.putImageData(pixels, 0, 0);

    return canvas.toDataURL('image/png');
  };

  return exports;
});

