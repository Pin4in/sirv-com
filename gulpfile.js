// Development
  var gulp = require('gulp');
  var sass = require('gulp-ruby-sass');
  var browserSync = require('browser-sync');
  var autoprefixer = require('gulp-autoprefixer');
  var jade = require('gulp-jade');
  var reload = browserSync.reload;

// Production
  var minifycss = require('gulp-minify-css');
  var concat = require('gulp-concat');
  var rename = require('gulp-rename');

// DEVELOPMENT
// Compile styles
gulp.task('dev-sass', function() {
  return sass('styles/main.sass',{ style: 'expanded' })
    .pipe(gulp.dest('build/assets/styles'))
    .pipe(reload({ stream:true }));
});
// Compile bootstrap
gulp.task('compile-bootstrap', function() {
  return sass('styles/bootstrap.sass',{ style: 'expanded' })
    .pipe(gulp.dest('build/assets/styles'))
    .pipe(reload({ stream:true }));
});

// Production
// Compile styles
gulp.task('prod-styles', function() {
  return sass('styles/main.sass',{ style: 'expanded' })
    .pipe(gulp.dest('production/assets/styles'))
    .pipe(reload({ stream:true }));
});


gulp.task('jade', function(){
    return gulp.src(['views/pages/*.jade', '*.jade'])
      .pipe(jade({pretty: true}))
      .pipe(gulp.dest('build'))
      .pipe(reload({ stream:true }));
});

// watch Sass and Jade files for changes, run the preprocessor and reload
gulp.task('serve', ['dev-sass', 'jade'], function() {
  browserSync({
    server: {
      baseDir: 'build'
    }
  });

  gulp.watch(['styles/sass/**/*.sass', 'styles/main.sass'] , ['dev-sass']);
  gulp.watch(['styles/bootstrap/*.sass', 'styles/bootstrap.sass'] , ['compile-bootstrap']);
  gulp.watch(['index.jade','views/**/*.jade'] , ['jade']);
  gulp.watch(['*.html', 'scripts/**/*.js'] , {cwd: 'build'}, reload);
});