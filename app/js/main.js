/* jshint strict: true */

// http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
// (see also call to resumeBootstrap in require() below)
window.name = "NG_DEFER_BOOTSTRAP!";

require(
['angular', 'lib/magiceye', 'lib/textures-component', 'lib/stereogram-app'],
function(angular, magiceye) {
  'use strict';

  angular.resumeBootstrap();
});
