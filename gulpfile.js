const gulp = require('gulp');
const jasmineBrowser = require('gulp-jasmine-browser');

const tests = () => {
    return gulp.src(['js/**/*.js', 'tests/spec/**/*.js'])
        .pipe(jasmineBrowser.specRunner());
};

gulp.task('tests', tests);
