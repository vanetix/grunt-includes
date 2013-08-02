var grunt = require('grunt');

exports.includes = {
  cases: function(test) {
    var expect, result;

    test.expect(7);

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/cases/simple.html");
    test.equal(expect, result, "should satisfy a simple case");

    expect = grunt.file.read("test/expected/complex.html");
    result = grunt.file.read("tmp/cases/complex.html");
    test.equal(expect, result, "should satisfy a complex case");

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/expected/simple.html");
    test.equal(expect, result, "should not touch file with no includes");

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/flatten/simple.html");
    test.equal(expect, result, "should flatten files");

    expect = grunt.file.read("test/expected/simple_windows.html");
    result = grunt.file.read("tmp/cases/simple_windows.html");
    test.equal(expect, result, "should satisfy simple windows case");

    expect = grunt.file.read("test/expected/banner.html");
    result = grunt.file.read("tmp/banner/banner.html");
    test.equal(expect, result, "should prepend the supplied banner");

    expect = grunt.file.read("test/expected/includePath_simple.html");
    result = grunt.file.read("/tmp/includePath/simple.html");
    test.equal(expect, result, "should use header footer from baseInclude dir");

    test.done();
  }
};
