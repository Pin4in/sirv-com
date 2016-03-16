// DEPENDENCIES
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var es = require('event-stream');
var newer = require('gulp-newer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

// additional variables
var files = require('./components-path.js');

var paths = {
  src: 'src',
  build: 'build'
}

function pathBuilder(arg, target, folder) {
  var newPath = arg.split('/');
      if(folder === true) {
        newPath.pop()
      }
      newPath.unshift(target)
      // console.log(newPath.join('/'))
      return newPath.join('/');
}

function buildPath(arg) {
  return pathBuilder(arg, paths.build, true);
}

function srcPath(arg) {
  return pathBuilder(arg, paths.src, false);
}

// ==================================================
// DEVELOPMENT
// ==================================================


// COMPILE my styles
gulp.task('compile-sass', function() {
  return sass('src/styles/sass/main.sass',{ style: 'compressed' })
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/styles'))
    .pipe(reload({ stream:true }));
});


// COMPILE bootstrap theme
gulp.task('compile-bootstrap-theme', function() {
  return sass('src/styles/bootstrap-theme/sirv-theme.sass',{ style: 'expanded' })
    .pipe(gulp.dest('build/styles'))
    .pipe(reload({ stream:true }));
});


// COMPYLE jade
gulp.task('compile-jade', function(){
    return gulp.src(['src/index.jade', 'src/views/pages/*.jade'])
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream:true }));
});


// Uglyfy js
gulp.task('concat-js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(reload({ stream:true }));
});


// COPY js components if NEW
gulp.task('js-components', function () {
    return es.merge(files.scripts.map(function (conf) {
      return gulp.src(srcPath(conf))
        .pipe(newer(buildPath(conf)))
        .pipe(gulp.dest(buildPath(conf)));
    }));
});


// COPY styles components if NEW
gulp.task('style-components', function () {
    return es.merge(files.styles.map(function (conf) {
      return gulp.src(srcPath(conf))
        .pipe(newer(buildPath(conf)))
        .pipe(gulp.dest(buildPath(conf)));
    }));
});

gulp.task('copy-assets', function () {
    return gulp.src(srcPath('assets/**/*.*'), {base:'./src/'})
      .pipe(gulp.dest('build'));
})

// ======================================================================
// watch Sass and Jade files for changes, run the preprocessor and reload
// ======================================================================
gulp.task('serve', ['compile-sass', 'compile-bootstrap-theme', 'compile-jade', 'style-components', 'js-components', 'concat-js', 'copy-assets'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    online: true
  });

  gulp.watch(['src/styles/sass/**/*.sass'] , ['compile-sass']);
  gulp.watch(['src/styles/bootstrap-theme/*{.sass,.scss}'] , ['compile-bootstrap-theme']);
  gulp.watch(['src/scripts/*.js'] , ['concat-js']);
  gulp.watch(['**/*.jade'] , ['compile-jade']);
  gulp.watch(['*.html'] , {cwd: 'build'}, reload);
});
