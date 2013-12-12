'use strict';

describe('Service: stereogram', function () {
  // load the services's module
  beforeEach(module('stereogramApp'));

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
});
