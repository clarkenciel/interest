var browserify = require('browserify')
var fs = require('fs')

browserify('./app/js/source.js')
  .transform('babelify', { presets: ['es2015', 'react'] })
  .bundle()
  .pipe(fs.createWriteStream('./app/js/app.js'))
