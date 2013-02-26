var grunt = require('grunt');

exports.includes = {
  cases: function(test) {
    var expect, result;
    
    test.expect(3);

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/cases/simple.html");
    test.equal(expect, result, "should satisfy simple case");
    result = grunt.file.read("tmp/expected/simple.html");
    test.equal(expect, result, "should not touch no includes file");

    expect = grunt.file.read("test/expected/complex.html");
    result = grunt.file.read("tmp/flatten/complex.html");
    test.equal(expect, result, "should satisfy flatten");

    test.done();
  }
};
