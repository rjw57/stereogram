module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    haml: {
      app: {
        files: [ { expand: true, cwd: 'app/', src: '*.haml', dest: 'build/', ext: '.html' } ],
      },

      templates: {
        files: [ { expand: true, src: 'templates/*.haml', dest: 'build/', ext: '.html' } ],
      }
    },

    copy: {
      // Copy assets from vendor directory needed by CSS
      assets: {
        files: [ { expand: true, src: 'vendor/bootstrap/fonts/*', dest: 'build/' } ],
      },

      // Copy require.js
      require: {
        files: [ { src: 'vendor/require/require.js', dest: 'build/' } ],
      },
    },

    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: 'js/',
          dir: 'build/',
          keepBuildDir: 'true',
          paths: {
            jquery: '../../vendor/jquery/jquery-2.0.3',
            bootstrap: '../../vendor/bootstrap/js/bootstrap',
            angular:  '../../vendor/angular/angular',
            lib: '../../lib',
          },
          shim: {
            bootstrap: { deps: ['jquery'] },
            angular: { exports: 'angular' },
          },
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false,
          fileExclusionRegExp: /(.haml$)|(^\.)/,
          modules: [
            { name: 'main' },
            {
              name: 'stereogram-worker',
              override: {
                wrap: { start: 'importScripts("../vendor/require/require.js")', },
              },
            },
          ],
        },
      },
    },

    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js', 'lib/*.js'],
    },

    clean: ['build/'],
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-haml');

  // GitHub pages
  grunt.registerTask('ghp-import', function() {
    var done = this.async(), self = this;

    this.requires('default');

    grunt.util.spawn({
      cmd: 'ghp-import', args: ['build/']
    }, function(error, result, code) {
      if(error) return grunt.log.error(error.message);
      done();
    });
  });
  grunt.registerTask('ghp', ['clean', 'default', 'ghp-import']);

  // Default tasks
  grunt.registerTask('default', ['jshint', 'requirejs', 'copy', 'haml']);
};
