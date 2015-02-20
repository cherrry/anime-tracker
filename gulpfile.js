"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var watchify = require("watchify");
var rename = require("gulp-rename");

var dashboard = watchify(browserify("./js/dashboard.js", watchify.args));
dashboard.transform("reactify");
dashboard.transform("brfs");

gulp.task("default", bundle);
dashboard.on("update", bundle);

function bundle() {
    return dashboard.bundle()
        .on("error", gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source("./js/dashboard.min.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./"));
}
