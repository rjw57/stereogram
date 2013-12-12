'use strict';

describe('directive: textures', function() {
  var $compile;
  var $rootScope;

  // Load the module, which contains the directive
  beforeEach(module('stereogramApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('replaces <texturegroup> element with a div with texture-group class', function() {
    var element = $compile('<texturegroup></texturegroup>')($rootScope);
    expect(element.html()).toMatch('class="[^"]*texture-group[^"]*"');
  });
});
