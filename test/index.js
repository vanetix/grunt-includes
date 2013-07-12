var grunt = require('grunt');

exports.includes = {
  cases: function(test) {
    var expect, result;

    test.expect(5);

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/cases/simple.html");
    test.equal(expect, result, "should satisfy simple case");

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/expected/simple.html");
    test.equal(expect, result, "should not touch file with no includes");

    expect = grunt.file.read("test/expected/complex.html");
    result = grunt.file.read("tmp/flatten/complex.html");
    test.equal(expect, result, "should satisfy flatten");

    expect = grunt.file.read("test/expected/simple_windows.html");
    result = grunt.file.read("tmp/cases/simple_windows.html");
    test.equal(expect, result, "should satisfy simple windows case");

    expect = grunt.file.read("test/expected/banner.html");
    result = grunt.file.read("tmp/banner/banner.html");
    test.equal(expect, result, "should prepend the supplied banner");

    test.done();
  }
};
