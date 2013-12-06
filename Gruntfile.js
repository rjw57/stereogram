module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    haml: {
      index: {
        files: { 'build/index.html': 'app/index.html.haml' },
      },
    },

    copy: {
      // Copy assets from vendor directory needed by CSS
      assets: {
        files: [ { expand: true, src: 'vendor/bootstrap/fonts/*', dest: 'build/' } ],
      },
    },

    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: '.',
          dir: 'build/',
          keepBuildDir: 'true',
          paths: {
            jquery: '../vendor/jquery/jquery-2.0.3',
            bootstrap: '../vendor/bootstrap/js/bootstrap',
            requireLib:  '../vendor/require/require',
          },
          shim: {
            bootstrap: { deps: ['jquery'] },
          },
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          fileExclusionRegExp: /.haml$/,
          modules: [
            { name: 'js/main', include: ['requireLib'] },
          ],
        },
      },
    },

    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js'],
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-haml');

  // Default tasks
  grunt.registerTask('default', ['jshint', 'requirejs', 'copy', 'haml']);
};
