var grunt = require('grunt');

exports.includes = {
  cases: function(test) {
    var expect, result;

    test.expect(10);

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

    expect = grunt.file.read("test/expected/include_path.html");
    result = grunt.file.read("tmp/include_path/simple.html");
    test.equal(expect, result, "should use header and footer from includes directory");

    expect = grunt.file.read("test/expected/template.html");
    result = grunt.file.read("tmp/template/template.html");
    test.equal(expect, result, "should have header and body wrapped with template");

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/full_path/simple.html");
    test.equal(expect, result, "should use the full filename given in include path");

    expect = grunt.file.read("test/expected/multiple_paths.html");
    result = grunt.file.read("tmp/multiple_paths/simple.html");
    test.equal(expect, result, "should use array of include paths to find proper path");

    test.done();
  }
};
