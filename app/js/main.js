/* jshint strict: true */

require(['lib/magiceye', 'jquery', 'bootstrap'], function(magiceye, $, _) {
  'use strict';

  var makeTexClickFunc = function(group) { return (function(event) {
    // remove 'active' from the currently selected texture
    var activeTex = group.find('.active').removeClass('active');

    // add 'active' to the clicked texture
    $(this).addClass('active');

    // stop the event bubbling
    event.preventDefault();

    // update stereogram
    updateStereogram();
  }); };

  // Wire up events for all textures
  $('[data-group="texture"]').each(function() {
    var textureGroup = $(this);
    textureGroup.find('[data-texture]').each(function() {
      $(this).click(makeTexClickFunc(textureGroup));
    });
  });

  // Called when the document is loaded or when background or depth image changes
  var updateStereogram = function() {
    var depthImg = $('#depth-image').get(0);
    var textureImg = $('[data-group="texture"]').first().find('.active .texture').get(0);
    var stereogramImg = $('#stereogram-image').get(0);

    console.log('hello', depthImg, textureImg, stereogramImg);

    if(!depthImg || !textureImg || !stereogramImg) return;
    if(!depthImg.complete || !textureImg.complete) return;

    console.log('Updating stereogram');
    var img = magiceye.updateMagicEye(depthImg, textureImg);
    stereogramImg.src = img.src;
  };

  // Update the initial stereogram when the DOM is ready and/or when all images are loaded
  $(document).ready(updateStereogram);
  $(document).load(updateStereogram);
});
