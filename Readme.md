# grunt-includes [![Build Status](https://travis-ci.org/vanetix/grunt-includes.png?branch=master)](https://travis-ci.org/vanetix/grunt-includes)
***Requires grunt ~0.4.0***

A grunt task for including a file within another file (think php includes). *Circular* imports will break the recursive strategy.

## Getting Started
Install this grunt plugin next to your project's *Gruntfile.js* with: `npm install grunt-includes --save-dev`

Then add this line to your project's `Gruntfile.js`:

```javascript
grunt.loadNpmTasks('grunt-includes');
```

## Options
#### includeRegexp
Type: `RegExp`

Sets the regular expression used to find *include* statements. The file path should always be the `$1`.

#### duplicates
Type: `boolean`
Default: `true`

Permits the same file to be included twice.

#### debug
Type: `boolean`
Default: `false`

Enables debug mode compilation.

## Usage

You can use this plugin to build html templates.

```javascript
includes: {
  files: {
    src: ['path/to/foo.html', 'path/to/bar.html'], // Source files
    dest: 'tmp', // Destination directory
    flatten: true,
    cwd: '.'
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
- 0.2.3 - Fix bug when building source files from a different platform. Thanks [wGEric](https://github.com/wGEric)!
- 0.2.0 - Support for expandable paths and debugging. Thanks [@ktmud](https://github.com/ktmud)!
- 0.1.0 - Updated for grunt 0.4
- 0.0.1 - Initial release

## License (MIT)
Copyright (c) 2013 Matt McFarland  

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
