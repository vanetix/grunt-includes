var grunt = require('grunt');

exports.includes = {
  cases: function(test) {
    var expect, result;
    
    test.expect(2);

    expect = grunt.file.read("test/expected/simple.html");
    result = grunt.file.read("tmp/simple.html");
    test.equal(expect, result, "should satisfy a simple case");

    expect = grunt.file.read("test/expected/complex.html");
    result = grunt.file.read("tmp/complex.html");
    test.equal(expect, result, "should satisfy a complex case");

    test.done();
  }
};
