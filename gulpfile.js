"use strict";

var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var gulp = require("gulp");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var watchify = require("watchify");
var watch = require("gulp-watch");

var copy_list = [
    "./css/**/*",
    "./dashboard.html",
    "./manifest.json"
];

var js_tasks = {
    "js/dashboard": {
        source: "./dashboard.js",
        basedir: "./js",
        output: "./js/dashboard.js"
    },
    "js/service": {
        source: "./service.js",
        basedir: "./js",
        output: "./js/service.js"
    }
};

gulp.task("default", [ "js", "copy", "watch" ], function () {});

// js bundle task
gulp.task("js", Object.keys(js_tasks));
for (var task_name in js_tasks) {
    gulp.task(task_name, bundle(task_name));
}

gulp.task("copy", function () {
    return gulp.src(copy_list, { base: "./" })
        .pipe(gulp.dest("./build"));
});

// watcher
gulp.task("watch", function () {
    return watch(copy_list, function () {
        gulp.start("copy");
    });
});

function bundle(task_name) {
    var task_def = js_tasks[task_name];
    var bundler = watchify(browserify(task_def.source, {
        basedir: task_def.basedir,
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
    }));

    bundler.on("update", function () {
        gulp.start(task_name);
    });

    return function() {
        bundler.bundle()
            .pipe(source(task_def.output))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write("./"))
            .pipe(gulp.dest("./build"));
    };
}
