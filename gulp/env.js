'use strict'

let gulp = require('gulp');
let gulpNgConfig = require('gulp-ng-config');
let conf = require('./conf')

var $ = require('gulp-load-plugins')();

gulp.task('config:env', () => {
  process.env.NODE_ENV = require('yargs').argv.NODE_ENV || process.env.NODE_ENV || 'development';
  process.env.NODE_ENV = ['development', 'production'].indexOf(process.env.NODE_ENV) == -1 
                       ? 'development'
                       : process.env.NODE_ENV;
  
  gulp.src('./env/index.env.json')
    .pipe(gulpNgConfig(conf.moduleName, {
      environment: process.env.NODE_ENV,
      createModule: false
    }))
    .pipe(gulp.dest('./src/app/'))
})
