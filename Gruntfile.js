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
      tests: {
        src: ['test/cases/simple.html', 'test/cases/complex.html'],
        dest: 'tmp'
      }
    }
  });

  // Load this task
  grunt.loadTasks('tasks');
  
  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Task task cleans `tmp` and builds includes, then runs tests
  grunt.registerTask('test', ['clean', 'includes', 'nodeunit']);

  // Default task
  grunt.registerTask('default', ['jshint', 'test']);
};
