const { watch, series } = require('gulp'); 
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');

/**
 *  -- TOP LEVEL FUNTIONS --
 * gulp.task - Define tasks
 * gulp.src - Point to files to use
 * gulp.dest -  point to folder to output files
 * gulp.watch - watch files and folders for change
 */

// Logs Message
async function message(){
    return console.log('Gulp is running now...');
};

// COpy all html files
async function copyHtml(){
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
};

// Task to minify css using the cleanCss package variable
async function minifyCss() {
    gulp.src('src/css/*.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
};

// Browsersync Task
async function syncBrowserServe(cb){
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
};

// BrowsersyncReload - reloads our browser
async function browsersyncReload(cb) {
    browsersync.reload();
    cb();
};

// Our Watch task keeps an eye on our files detect change
async function watchTask(){
    watch('*.html', browsersyncReload); // change detected in html files
    watch('src/css/**/*.css', series(minifyCss, browsersyncReload)); // if any change is detected in css files then reload. if you have js and css then use []
};

// Default Gulp task (My gulp workflow)
exports.default = series(message, copyHtml, minifyCss, syncBrowserServe, watchTask);

// Build Gulp Tasks
exports.build = series(copyHtml, minifyCss)
