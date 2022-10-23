#!/usr/bin/env node
'use strict';

import cached from 'gulp-cached';
import cssnano from 'gulp-cssnano';
import { sync } from 'del';
import fileinclude from 'gulp-file-include';
import { task, watch, series, src as _src, dest, parallel } from 'gulp';
import gulpif from 'gulp-if';
import npmdist from 'gulp-npm-dist';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref-plus';
import rename from 'gulp-rename';
const sass = require('gulp-sass')(require('sass'));
import autoprefixer from "gulp-autoprefixer";
import { init, write } from "gulp-sourcemaps";
import cleanCSS from 'gulp-clean-css';
import rtlcss from 'gulp-rtlcss';
// const path = require('path');

const browsersync = require('browser-sync').create();

//module.exports = init() {

// const { task, watch, series, _src, dest, parallel } =  require('gulp');
// const cached = require('gulp-cached');
// const cssnano = require('gulp-cssnano');
// const { sync } = require('del');
// const fileinclude = require('gulp-file-include');
// const gulpif  = require('gulp-if');
// const npmdist = require('gulp-npm-dist');
// const replace = require('gulp-replace');
// const uglify  = require('gulp-uglify');
// const useref  = require('gulp-useref-plus');
// const rename  = require('gulp-rename');
// const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require("gulp-autoprefixer");
// const { init, write } = require("gulp-sourcemaps");
// const cleanCSS = require('gulp-clean-css');
// const rtlcss = require('gulp-rtlcss');
// const path = require('path');

const paths = {
  base:   {
    base:         {
      dir:    './'
    },
    node:         {
      dir:    './node_modules'
    },
    packageLock:  {
      files:  './package-lock.json'
    }
  },
  dist:   {
    base:   {
      dir:    './dist',
      files:  './dist/**/*'
    },
    libs:   {
      dir:    './dist/assets/libs'
    },
    css:    {
      dir:    './dist/assets/css',
    },
    js:    {
      dir:    './dist/assets/js',
      files:  './dist/assets/js/pages',
    },
  },
  src:    {
    base:   {
      dir:    './src',
      files:  './src/**/*'
    },
    css:    {
      dir:    './src/assets/css',
      files:  './src/assets/css/**/*'
    },
    html:   {
      dir:    './src',
      files:  './src/**/*.html',
    },
    img:    {
      dir:    './src/assets/images',
      files:  './src/assets/images/**/*',
    },
    js:     {
      dir:    './src/assets/js',
      pages:  './src/assets/js/pages',
      files:  './src/assets/js/pages/*.js',
      main:   './src/assets/js/*.js',
    },
    partials:   {
      dir:    './src/partials',
      files:  './src/partials/**/*'
    },
    scss:   {
      dir:    './src/assets/scss',
      files:  './src/assets/scss/**/*',
      main:   './src/assets/scss/*.scss'
    }
  }
};

task('browsersync', function(callback) {
  browsersync.init({
    server: {
      baseDir: [paths.dist.base.dir, paths.src.base.dir, paths.base.base.dir]
    },
  });
  callback();
});

task('browsersyncReload', function(callback) {
  browsersync.reload();
  callback();
});

task('watch', function() {
  watch(paths.src.scss.files, series('scss', 'browsersyncReload'));
  watch([paths.src.js.dir], series('js','browsersyncReload'));
  watch([paths.src.js.pages], series('jsPages','browsersyncReload'));
  watch([paths.src.html.files, paths.src.partials.files], series('fileinclude', 'browsersyncReload'));
});

task('js', function() {
  return _src(paths.src.js.main)
    .pipe(uglify())
    .pipe(dest(paths.dist.js.dir));
});

task('jsPages', function() {
  return _src(paths.src.js.files)
    .pipe(uglify())
    .pipe(dest(paths.dist.js.files));
});

task('scss', function () {
  // generate ltr
  _src(paths.src.scss.main)
    .pipe(init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(
      autoprefixer()
    )
    .pipe(dest(paths.dist.css.dir))
    .pipe(cleanCSS())
    .pipe(
      rename({
        //
        suffix: ".min"
      })
    )
    .pipe(write("./"))
    .pipe(dest(paths.dist.css.dir));

  // generate rtl
  return _src(paths.src.scss.main)
    .pipe(init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer()
    )
    .pipe(rtlcss())
    .pipe(dest(paths.dist.css.dir))
    // .pipe(cleanCSS())
    .pipe(
      rename({
        //
        suffix: "-rtl.min"
      })
    )
    .pipe(write("./"))
    .pipe(dest(paths.dist.css.dir));
});

task('fileinclude', function(callback) {
  return _src([
      paths.src.html.files,
      '!' + paths.dist.base.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(cached())
    .pipe(dest(paths.dist.base.dir));
});

task('clean:packageLock', function(callback) {
  sync(paths.base.packageLock.files);
  callback();
});

task('clean:dist', function(callback) {
  sync(paths.dist.base.dir);
  callback();
});

task('copy:all', function() {
  return _src([
      paths.src.base.files,
      '!' + paths.src.partials.dir, '!' + paths.src.partials.files,
      '!' + paths.src.scss.dir, '!' + paths.src.scss.files,
      '!' + paths.src.js.dir, '!' + paths.src.js.files, '!' + paths.src.js.main,
      '!' + paths.src.html.files,
    ])
    .pipe(dest(paths.dist.base.dir));
});

task('copy:libs', function() {
  return _src(npmdist(), { base: paths.base.node.dir })
    .pipe(rename(function(path) {
        path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(dest(paths.dist.libs.dir));
});

task('html', function() {
  return _src([
      paths.src.html.files,
      '!' + paths.dist.base.files,
      '!' + paths.src.partials.files
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true,
    }))
    .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
    .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
    .pipe(useref())
    .pipe(cached())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano({svgo: false})))
    .pipe(dest(paths.dist.base.dir));
});

//const gulp = require( 'gulp' );

// const pwa = require( 'gulp-pwa' );

// const options = {
//   srcDir: '/dist/assets/images/',
//   name: 'BridgeIt',
//   short_name: 'BridgeIt',
//   theme_color: '#9cff03',
//   background_color: '#9cff03',
// }

// gulp.task( 'build', () => {
//   gulp.series(gulp.parallel('clean:packageLock', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html');
//   return gulp.src( 'html/**/*.html' ).pipe( pwa( options ) ).pipe(gulp.dest( 'dist' ));
// });

// gulp.task('build', gulp.series(gulp.parallel('clean:tmp', 'clean:packageLock', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html'));
task('build', series(parallel('clean:packageLock', 'clean:dist', 'copy:all', 'copy:libs'), 'scss', 'html'));

// gulp.task('default', gulp.series(gulp.parallel('fileinclude', 'scss'), gulp.parallel('browsersync', 'watch')));
task('default', series(parallel('clean:packageLock', 'clean:dist', 'copy:all', 'copy:libs', 'fileinclude', 'scss', 'js', 'jsPages', 'html'), parallel('browsersync', 'watch')));

//}