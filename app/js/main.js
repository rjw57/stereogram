define('magiceye', function() {
  var exports = {};

  exports.updateMagicEye = function(canvas, depthImg, textureImg) {
    var imageSize;

    console.log('Updating magic eye');

    // Calculate size of image
    imageSize = { w: depthImg.width + textureImg.width, h: depthImg.height };
    canvas.width = imageSize.w;
    canvas.height = imageSize.h;
  };

  return exports;
});

require(['magiceye', 'bootstrap'], function(magiceye) {
  var depthImg = document.getElementById('depth-image');
  var textureImg = document.getElementById('texture-image');
  var magicEyeCanvas = document.getElementById('magic-eye');

  // Called when the depth and texture images change loading state. Checks to
  // see if images have been loaded and, if so, updates the magic eye canvas.
  var imgLoaded = function() {
    if(!depthImg.complete || !textureImg.complete) return;
    console.log('Loading complete');
    magiceye.updateMagicEye(magicEyeCanvas, depthImg, textureImg);
  };

  depthImg.onload = textureImg.onload = imgLoaded;
  imgLoaded();
});
