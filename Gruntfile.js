module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/includes.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    nodeunit: {
      tests: ['test/index.js']
    },

    // Remove test staging directory
    clean: {
      tests: ['tmp']
    },

    // Build the test cases
    includes: {
      options: {
        debug: false
      },
      tests: {
        cwd: 'test',
        src: ['**/*.html'],
        dest: 'tmp'
      },
      flatten: {
        flatten: true,
        src: ['test/cases/simple.html'],
        dest: 'tmp/flatten'
      },
      banner: {
        src: ['test/cases/simple.html'],
        dest: 'tmp/banner/banner.html',
        options: { banner: '/* banner test */\n'}
      }
    }
  });

  // Load this task
  grunt.loadTasks('tasks');

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Test task cleans `tmp` and builds includes, then runs tests
  grunt.registerTask('test', ['clean', 'includes', 'nodeunit']);

  // Default task
  grunt.registerTask('default', ['jshint', 'test']);
};
