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

  var defaultRegexp = /^(\s*)include\s+"(\S+)"\s*$/; 

  /**
   * Core `grunt-includes` task
   * Iterates over all source files and calls `recurse(path)` on each
   */

  grunt.registerMultiTask('includes', 'Include other files within files.', function() {
    var opts = this.options({
      debug: false,
      duplicates: true,
      includeRegexp: defaultRegexp
    });

    this.files.forEach(function(f) {
      var cwd = f.cwd;
      var src = f.src.filter(function(p) {
        p = cwd ? path.join(cwd, p) : p;
        if(grunt.file.exists(p)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + p + '" not found.');
          return false;
        }
      });

      if(src.length > 1 && grunt.file.isFile(f.dest)) {
        grunt.log.warn('Source file cannot be more than one when dest is a file.');
      }

      src.forEach(function(p) {
        var fileName = f.flatten ? path.basename(p) : p;
        var outFile = grunt.file.isFile(f.dest) ? f.dest : path.join(f.dest, fileName);

        p = cwd ? path.join(cwd, p) : p;

        grunt.file.write(outFile, recurse(p, opts));
        grunt.log.oklns('Saved ' + outFile);
      });
      
    });
  });

  /**
   * Returns the comment style for file `p`
   *
   * @param {String} p
   * @return {String}
   */

  function commentStyle(p) {
    var comments,
        ext = path.extname(p).slice(1);

    comments = {
      js: "/* %s */",
      css: "/* %s */",
      html: "<!-- %s -->"
    };

    return comments[ext] || '/* %s */';
  }

  /**
   * Helper for `includes` builds all includes for `p`
   *
   * @param {String} p
   * @return {String}
   */

  function recurse(p, opts, included) {
    var src, next, match, error, comment, compiled;

    comment = commentStyle(p);
    included = included || [];

    if(!grunt.file.isFile(p)) {
      grunt.log.warn('Included file "' + p + '" not found.');
      return 'Error including "' + p + '".';
    }

    if(opts.duplicates && ~included.indexOf(p)) {
      error = 'Duplicate include: ' + p + ' skipping.';
      grunt.log.debug(error);

      if(opts.debug) {
        return comment.replace(/%s/g, error);
      } else {
        return '';
      }
    }

    src = grunt.file.read(p).split(grunt.util.linefeed);
    compiled = src.map(function(line) {
      match = line.match(opts.includeRegexp);

      if(match) {
        next = path.join(path.dirname(p), match[1]);
        line = recurse(next, opts, included);

        if(opts.debug) {
          var msg_begin = 'File: ' + next;
          var msg_end = 'EOF: ' + next;
          line = comment.replace('%s', msg_begin) + '\n' + line + '\n'; 
          line = line + comment.replace('%s', msg_end); 
        }
      }
      return line;
    });

    return  compiled.join(grunt.util.linefeed);
  }

};
