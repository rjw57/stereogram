/* jshint strict: true */

define(function() {
  'use strict';

  var exports = {};

  var imageDataFromImage = function(img) {
    // Create a canvas element the same size as the image
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image into canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Get image data from canvas
    return ctx.getImageData(0, 0, img.width, img.height);
  };

  exports.updateMagicEye = function(canvas, depthImg, textureImg) {
    var maxDepthOffset = 64;

    var imageSize;

    var leftMargin = Math.max(textureImg.width, maxDepthOffset);

    // Calculate size of image
    imageSize = { w: depthImg.width + leftMargin, h: depthImg.height };
    canvas.width = imageSize.w;
    canvas.height = imageSize.h;

    // Get image data for the depth and texture images
    var depthData = imageDataFromImage(depthImg);

    var ctx = canvas.getContext('2d');

    // Draw the texture image into the left side of the canvas
    for(var x = 0; x < leftMargin; x += textureImg.width) {
      for(var y = 0; y < canvas.height; y += textureImg.height) {
        ctx.drawImage(textureImg, x, y);
      }
    }

    // Get the canvas' image data for writing
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Generate pixels
    for(var row_idx=0; row_idx<pixels.height; ++row_idx) {
      // Calculate indices into depth and pixel data. Note that we start the pixel
      // row textureImg.width pixels in
      var depthRowOffset = row_idx * 4 * depthData.width;
      var pixelsRowOffset = (row_idx * pixels.width + leftMargin) * 4;

      for(var col_idx=0; col_idx<depthImg.width; ++col_idx) {
        var depth = depthData.data[depthRowOffset + col_idx*4];

        // Rescale depth from 0 -> maxDepthOffset
        depth *= maxDepthOffset / 255;

        var offset = Math.floor(textureImg.width - depth);
        for(var i=0; i<4; ++i) {
          pixels.data[pixelsRowOffset + col_idx*4 + i] = pixels.data[pixelsRowOffset + (col_idx - offset)*4 + i];
        }
      }
    }

    // Copy pixels back to canvas
    ctx.putImageData(pixels, 0, 0);
  };

  return exports;
});

