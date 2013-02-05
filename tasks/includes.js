/*
 * grunt-includes
 * https://github.com/vanetix/grunt-includes
 *
 * Copyright (c) 2013 Matt McFarland
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  /**
   * Dependencies
   */
  var path = require('path');

  /**
   * Regex for parsing includes
   */

  var regex = /^(\s*)include\s+"(\S+)"\s*$/; 

  /**
   * Core `grunt-includes` task
   */

  grunt.registerMultiTask('includes', 'Your task description goes here.', function() {

    /**
     * Iterate over all source files and build any includes
     */

    this.files.forEach(function(f) {
      var src = f.src.filter(function(path) {
        if(grunt.file.exists(path)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + path + '" not found.');
          return false;
        }
      });

      if(grunt.file.isFile(f.dest)) {
        grunt.fail.warn('Destination directory "' + f.dest + '" is a file.');
      }

      src.forEach(function(file) {
        grunt.file.write(path.join(f.dest, path.basename(file)), recurse(file));
      });
      
    });
  });

  /**
   * Helper for `includes` builds all includes for `p`
   *
   * @param {String} p
   * @return {String}
   */

  function recurse(p) {
    if(!grunt.file.isFile(p)) {
      grunt.log.warn('Included file "' + p + '" not found.');
      return 'Error including "' + p + '".';
    }

    var src = grunt.file.read(p).split(grunt.util.linefeed);
    var compiled = src.map(function(line) {
      var match = line.match(regex);

      if(match) {
        return recurse(path.join(path.dirname(p), match[2]));
      }
      return line;
    });

    return  compiled.join(grunt.util.linefeed);
  }

};
