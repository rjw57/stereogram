'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('stereogramApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach an empty depth, stereogram and texture URL to the scope', function () {
    expect(scope.depthImageUrl).toBe('');
    expect(scope.textureImageUrl).toBe('');
    expect(scope.stereogramImageUrl).toBe('');
  });
});
