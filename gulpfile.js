'use strice';

var gulp = require('gulp');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var babel = require('gulp-babel');
var shell = require('gulp-shell');
var spawn = require('child_process').spawn;
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');

var CONFIG = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var WEBAPP = CONFIG.webapp
var ASSETS_SRC = WEBAPP + '/assets';
var ASSETS = WEBAPP + '/assets';

function errorAlert(error) {
    notify.onError({title: "Gulp Error", message: "Check your terminal", sound: "Purr"})(error); //Error Notification
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
}


/**
 * plugin update
 */
gulp.task('plugin update', shell.task([
    'bower cache clean',
    'bower update'
]));

/**
 * JS
 */
gulp.task('plugin-js', function(){
    var jss = [
        ASSETS_SRC + '/plugins/jquery/dist/jquery.js',
        ASSETS_SRC + '/plugins/bootstrap-sass/assets/javascripts/bootstrap.js',
        ASSETS_SRC + '/plugins/jquery.easy-pie-chart/dist/easypiechart.min.js',
        ASSETS_SRC + '/plugins/ol/ol_v4.1.0.js'
    ];

    gulp.src(jss)
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sourcemaps.init())
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest(ASSETS + '/js'))
        .pipe(concat('plugins.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(ASSETS + '/js'))
});
