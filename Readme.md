# grunt-includes [![Build Status](https://travis-ci.org/vanetix/grunt-includes.png?branch=master)](https://travis-ci.org/vanetix/grunt-includes)
***Requires grunt ~0.4.0***

A grunt task for including a file within another file (think php includes). *Circular* imports will break the recursive strategy. *All includes retain parent and child indentation*

## Getting Started
Install this grunt plugin next to your project's *Gruntfile.js* with: `npm install grunt-includes --save-dev`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-includes');
```

## Options

#### banner
Type: `String`
Default: `''`

String processed by `grunt.template.process`, and prepended to every compiled file.

#### duplicates
Type: `Boolean`
Default: `true`

Permits the same file to be included twice.

#### debug
Type: `Boolean`
Default: `false`

Enables debug mode compilation.

#### includeRegexp
Type: `RegExp`
Default: `/^(\s*)include\s+"(\S+)"\s*$/`
Matches: `include "some/file.html"`

Sets the regular expression used to find *include* statements.

A regex group is used to identify the important parts of the include statement.  When constructing your own regex, it can contain up to two groups (denoted by parentheses `()` in the regular expression):

 1. The indentation whitespace to be appended to the front of the included file's contents
 2. The file location

**All regular expressions used must contain at least one group.**  If only one group is used, it will be assumed to contain the file path.

#### displaySavedFileMsg
Type: `Boolean`
Default: 'true'

Enables or disables the 'Saved {file name and path}' message on success.

## Usage

You can use this plugin to build html templates.

```javascript
includes: {
  files: {
    src: ['path/to/foo.html', 'path/to/bar.html'], // Source files
    dest: 'tmp', // Destination directory
    flatten: true,
    cwd: '.'
    options: {
      banner: '<!-- I am a banner <% includes.files.dest %> -->'
    }
  }
}
```

Or even organize your static files.

```javascript
includes: {
  js: {
    options: {
      includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
      duplicates: false,
      debug: true
    },
    files: {
      cwd: 'assets/js/',
      src: '**/*.js',
      dest: 'assets/dist/js/',
    },
  },
},
watch: {
  js: {
    files: ['assets/js/**/*.js'],
    tasks: ['includes:js', 'jshint']
  },
},
```

## Example
*index.html*
```html
<html>
<head>
  <title>Show me</title>
</head>
<body>
  include "content.html"
</body>
</html>
```
*content.html*
```html
<div class="content">
  <h1>Content</h1>
  <p>More content</p>
</div>
```
**Produces**
```html
<html>
<head>
  <title>Show me</title>
</head>
<body>
  <div class="content">
    <h1>Content</h1>
    <p>More content</p>
  </div>
</body>
</html>
```

## Release History
- 0.3.1 - Add flag to turn off 'Saved {file name}' message.
- 0.3.0 - Add indention preservation and banner support
- 0.2.3 - Fix bug when building source files from a different platform. Thanks [wGEric](https://github.com/wGEric)!
- 0.2.0 - Support for expandable paths and debugging. Thanks [@ktmud](https://github.com/ktmud)!
- 0.1.0 - Updated for grunt 0.4
- 0.0.1 - Initial release

## License (MIT)
Copyright (c) 2012-2013 Matt McFarland

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
