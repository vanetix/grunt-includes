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
   * Format of comments per file extension
   */

  var commentStyle = {
    js: "/* %s */",
    css: "/* %s */",
    html: "<!-- %s -->",
    generic: "/* %s */"
  };

  /**
   * Core `grunt-includes` task
   * Iterates over all source files and calls `recurse(path)` on each
   */

  grunt.registerMultiTask('includes', 'Your task description goes here.', function() {
    var opts = this.options({
      regex: regex,
      pos: 2, // the regex match group pos
      nodup: false, // no duplicate files, that means already included files will not be imported again
      comment: null, // default comment based on filename
      debug: process.env.DEBUG 
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

      var flatten = f.flatten;

      src.forEach(function(p) {
        var save_name = flatten ? path.basename(p) : p;
        var dest_file = isfile ? f.dest : path.join(f.dest, save_name);

        p = cwd ? path.join(cwd, p) : p;

        if (opts.comment) {
          opts.comment = commentStyle[fileType(p)] || commentStyle['generic'];
        }
        grunt.file.write(dest_file, recurse(p, opts));
        grunt.log.oklns('Saved ' + dest_file);
      });
      
    });
  });

  /**
   * Is file with path `p` an html file?
   *
   * @param {String} p
   * @return {Boolean}
   */

  function fileType(p) {
    return path.extname(p).slice(1);
  }

  /**
   * Helper for `includes` builds all includes for `p`
   *
   * @param {String} p
   * @return {String}
   */

  function recurse(p, opts, included) {
    if(!grunt.file.isFile(p)) {
      grunt.log.warn('Included file "' + p + '" not found.');
      return 'Error including "' + p + '".';
    }

    included = included || {};

    var comment = opts.comment;

    if (opts.nodup && (p in included)) {
      var msg = 'File ' + p + ' included before, skip';
      grunt.log.debug(msg);
      return opts.debug && comment.replace('%s', msg) || '';
    }

    included[p] = 1;

    var src = grunt.file.read(p).split(grunt.util.linefeed);
    var compiled = src.map(function(line) {
      var match = line.match(opts.regex);

      if(match) {
        var f = path.join(path.dirname(p), match[opts.pos]);
        line = recurse(f, opts, included);
        if (opts.debug) {
          var msg_begin = 'File: ' + f;
          var msg_end = 'EOF: ' + f;
          line = comment.replace('%s', msg_begin) + '\n' + line + '\n'; 
          line = line + comment.replace('%s', msg_end); 
        }
      }
      return line;
    });

    return  compiled.join(grunt.util.linefeed);
  }

};
