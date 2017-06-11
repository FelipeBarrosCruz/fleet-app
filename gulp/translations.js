'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('translations-reload', function() {
  return buildTranslations()
    .pipe(browserSync.stream());
});

gulp.task('translations', function() {
  return buildTranslations();
});

function buildTranslations() {
  return gulp.src(path.join(conf.paths.src, '/app/components/**/language/*.json'))
    .pipe($.angularTranslate())
    .pipe(gulp.dest(path.join(conf.paths.src, '/app')))
}