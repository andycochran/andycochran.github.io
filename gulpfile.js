var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// Compile, autoprefix, minify SASS
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});


// Concat, minify custom JavaScript
gulp.task('scripts', function() {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/what-input/dist/what-input.js',
      'bower_components/foundation-sites/dist/js/foundation.js',
      'js/bouncemarker.js',
      'js/app.js'
    ])
    .pipe($.concat('scripts.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('js'));
});


// Font Awesome
gulp.task('icons', function() { 
  return gulp.src('bower_components/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('fonts')); 
});


// Default task run on npm start
gulp.task('default', ['sass', 'scripts', 'icons'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/app.js'], ['scripts']);
});
