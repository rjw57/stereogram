'use strict';

describe('directive: texturegroup', function() {
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

  it('replaces texturegroup element with a div with texture-group class', function() {
    var element = $compile('<div texturegroup></div>')($rootScope);
    expect(element.html()).toMatch('class="[^"]*texture-group[^"]*"');
  });

  it('replaces texture element with a div with texture-frame and src', function() {
    var element = $compile('<div texturegroup><div texture src="fooBarBuzz"></div>')($rootScope);
    expect(element.html()).toMatch('class="[^"]*texture-frame[^"]*"');
    expect(element.html()).toContain('fooBarBuzz');
  });

  it('add empty list of textures to scope when no child textures specified', function() {
    var element = $compile('<div texturegroup></div>')($rootScope);
    $rootScope.$digest();
    expect(element.isolateScope().textures.length).toBe(0);
  });

  it('add list of textures to scope corresponding to textures', function() {
    var element = $compile(
      '<div texturegroup>'+
        '<texture src="foo"></texture><texture src="bar"></texture>' +
      '</div>')($rootScope);
    $rootScope.$digest();

    var textures = element.isolateScope().textures;
    expect(textures.length).toBe(2);
    expect(textures[0].src).toBe('foo');
    expect(textures[1].src).toBe('bar');
  });

  it('records selected texture url', function() {
    var element = $compile(
      '<div texturegroup ng-model="texUrl">'+
        '<texture src="foo"></texture><texture selected=1 src="bar"></texture>' +
        '<texture src="buzz"></texture>' +
      '</div>')($rootScope);
    $rootScope.$digest();

    var textures = element.isolateScope().textures;
    expect(textures.length).toBe(3);
    expect(textures[0].src).toBe('foo');
    expect(textures[1].src).toBe('bar');
    expect(textures[2].src).toBe('buzz');
    expect($rootScope.texUrl).toBe('bar');
  });

  it('defaults to selecting first texture url', function() {
    var element = $compile(
      '<div texturegroup ng-model="texUrl">'+
        '<texture src="foo"></texture><texture src="bar"></texture>' +
        '<texture src="buzz"></texture>' +
      '</div>')($rootScope);
    $rootScope.$digest();

    var textures = element.isolateScope().textures;
    expect(textures.length).toBe(3);
    expect(textures[0].src).toBe('foo');
    expect(textures[1].src).toBe('bar');
    expect(textures[2].src).toBe('buzz');
    expect($rootScope.texUrl).toBe('foo');
  });
});
