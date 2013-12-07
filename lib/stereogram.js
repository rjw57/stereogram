/* jshint strict: true */

define(['lib/stereogram-engine'], function(engine) {
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

  // webworker which computes stereogram
  var sgWorker = new Worker('js/stereogram-worker.js');
  sgWorker.onmessage = function(event) {
    var tag = event.data.tag;
    var cb = tagCallbacks[tag];
    if(!cb) return;
    cb(event.data);
    delete tagCallbacks[tag];
  };

  // Next tag for message
  var nextTag = 0;

  // Callbacks for tags
  var tagCallbacks = { };

  var renderFromImages = function(depthImg, textureImg, done) {
    // Extract data from images
    var depthData = imageDataFromImage(depthImg);
    var textureData = imageDataFromImage(textureImg);

    // Calculate left-most margin
    var maxDepthOffset = 64;
    var leftMargin = Math.max(textureData.width, maxDepthOffset);

    // Calculate size of image
    var imageSize = { w: depthData.width + leftMargin, h: depthData.height };
    var canvas = document.createElement('canvas');
    canvas.width = imageSize.w;
    canvas.height = imageSize.h;

    var ctx = canvas.getContext('2d');

    // Get the canvas' image data for writing
    var pixels = ctx.createImageData(imageSize.w, imageSize.h);

    tagCallbacks[nextTag] = function(data) {
      var ctx = canvas.getContext('2d');

      // Copy pixels back to canvas
      ctx.putImageData(data.imageData, 0, 0);

      return done(null, canvas.toDataURL('image/png'));
    };

    sgWorker.postMessage({
      tag: nextTag,
      depthData: depthData,
      textureData: textureData,
      destData: pixels,
      maxDepthOffset: maxDepthOffset
    });

    ++nextTag;
  };

  // Given a URL for the depth image and texture image, return a
  // dataURL whose contents represent a magic eye picture.
  exports.render = function(depthUrl, textureUrl, done) {
    var depthImg = new Image(), textureImg = new Image();

    depthImg.onload = textureImg.onload = function() {
      if(!depthImg.complete || !textureImg.complete) return;
      renderFromImages(depthImg, textureImg, done);
    };

    depthImg.src = depthUrl;
    textureImg.src = textureUrl;
  };

  return exports;
});

