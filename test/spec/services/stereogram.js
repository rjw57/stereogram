'use strict';

describe('Service: stereogram', function () {
  // load the services's module
  beforeEach(module('stereogramApp'));

  var createImageData = function(width, height) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var data = ctx.createImageData(width, height);

    // Initialise data to 0x70
    for(var i in data.data) { data[i] = 0x70; }

    return data;
  };

  var stereogram;

  // Initialize the service
  beforeEach(inject(function ($stereogram) {
    stereogram = $stereogram;
  }));

  it('should exist', function() {
    expect(stereogram).not.toBeUndefined();
  });

  it('should export renderIntoImageData function', function() {
    expect(stereogram.renderIntoImageData).not.toBeUndefined();
  });

  it('should accept three image data instances', function() {
    var
      depth = createImageData(640, 480),
      tex = createImageData(60,60),
      dest = createImageData(640,480);

    expect(depth).toBeTruthy();
    expect(tex).toBeTruthy();
    expect(dest).toBeTruthy();

    stereogram.renderIntoImageData(depth, tex, dest);
  });

  it('should only write data from texture image to output', function() {
    var
      depth = createImageData(40, 40),
      tex = createImageData(10,10),
      dest = createImageData(40,40),
      i;

    for(i in tex.data) {
      tex.data[i] = 10 + (i % 10);
    }

    stereogram.renderIntoImageData(depth, tex, dest);

    for(i in dest.data) {
      expect(dest.data[i]).toBeGreaterThan(9);
      expect(dest.data[i]).toBeLessThan(20);
    }
  });
});
