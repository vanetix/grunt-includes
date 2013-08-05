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
   * Regex for matching new lines
   */

  var newlineRegexp = /\r?\n/g;

  /**
   * Core `grunt-includes` task
   * Iterates over all source files and calls `recurse(path)` on each
   */

  grunt.registerMultiTask('includes', 'Include other files within files.', function() {
    var banner;

    /**
     * Default options
     */

    var opts = this.options({
      debug: false,
      banner: '',
      silent: false,
      duplicates: true,
      includeRegexp: defaultRegexp,
      includePath: '',
      includePrefix: '',
      includeExt: ''
    });

    // Render banner
    banner = grunt.template.process(opts.banner);

    this.files.forEach(function(f) {
      var src, cwd = f.cwd;

      src = f.src.filter(function(p) {
        if(cwd) {
          p = path.join(f.cwd, p);
        }

        if(grunt.file.isFile(p)) {
          return true;
        } else {
          grunt.log.warn('Source file "' + p + '" not found.');
          return false;
        }
      });

      if(src.length > 1 && isFilename(f.dest)) {
        grunt.log.warn('Source file cannot be more than one when dest is a file.');
      }

      src.forEach(function(p) {
        var fileName = f.flatten ? path.basename(p) : p;
        var outFile = isFilename(f.dest) ? f.dest : path.join(f.dest, fileName);

        if(cwd) {
          p = path.join(cwd, p);
        }

        grunt.file.write(outFile, banner + recurse(p, opts));

        if(!opts.silent) {
          grunt.log.oklns('Saved ' + outFile);
        }
      });

    });
  });

  /**
   * Checks if `p` is a filepath, being it has an extension.
   *
   * @param {String} p
   * @return {Boolean}
   */

  function isFilename(p) {
    return !!path.extname(p);
  }

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
   * Returns the new line style for file `p`
   *
   * @param {String} p
   * @return {String}
   */

  function newlineStyle(p) {
    var matches = grunt.file.read(p).match(newlineRegexp);

    return (matches && matches[0]) || grunt.util.linefeed;
  }

  /**
   * Helper for `includes` builds all includes for `p`
   *
   * @param {String} p
   * @return {String}
   */

  function recurse(p, opts, included, indents) {
    var src, next, match, error, comment,
        newline, compiled, indent, fileLocation;

    if(!grunt.file.isFile(p)) {
      grunt.log.warn('Included file "' + p + '" not found.');
      return 'Error including "' + p + '".';
    }

    indents = indents || '';
    comment = commentStyle(p);
    newline = newlineStyle(p);
    included = included || [];

    /**
     * If `opts.duplicates` is false and file has been included,
     * error
     */

    if(!opts.duplicates && ~included.indexOf(p)) {
      error = 'Duplicate include: ' + p + ' skipping.';
      grunt.log.error(error);

      if(opts.debug) {
        return comment.replace(/%s/g, error);
      } else {
        return '';
      }
    }

    /**
     * At this point the file is considered included
     */

    included.push(p);

    /**
     * Split the file on newlines
     */

    src = grunt.file.read(p).split(newline);

    /**
     * Loop through the file calling `recurse` if an include is found
     */

    compiled = src.map(function(line) {
      match = line.match(opts.includeRegexp);

      /**
       * If the line has an include statement, recurse
       */

      if(match) {
        fileLocation = match[2];
        indent = match[1];

        if (!fileLocation) {
          fileLocation = indent;
          indent = '';
        }

        fileLocation = opts.includePrefix + fileLocation + opts.includeExt;

        next = path.join((opts.includePath || path.dirname(p)), fileLocation);
        line = recurse(next, opts, included, indents + indent);

        /**
         * Include debug comments if `opts.debug`
         */

        if(opts.debug) {
          line = comment.replace(/%s/g, 'Begin: ' + next) +
                 newline + line + newline + comment.replace(/%s/g, 'End: ' + next);
        }
      }

      // If there are indents and not a match, add them to the line
      return line && indents && !match ? indents + line : line;
    });

    return  compiled.join(newline);
  }

};
