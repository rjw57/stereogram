/* jshint strict: true */

// http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
// (see also call to resumeBootstrap in require() below)
window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular'], function(angular, magiceye) {
  'use strict';
  angular.resumeBootstrap();
});
