/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const ts = require('gulp-typescript');

const tsDevProject = ts.createProject('tsconfig.json');
const tsBuildProject = ts.createProject('tsconfig.publish.json');

gulp.task('test-unit', testUnit);
gulp.task('build', build);

/****** Task Function Definitions ******/

async function build() {
  let tsResult = tsBuildProject.src()
    .pipe(tsBuildProject());

  await tsResult.js.pipe(gulp.dest('dist'));
  await tsResult.dts.pipe(gulp.dest('dist'));
}

function testUnit(done) {
  return (
    gulp
      .src('test/**/*.ts', {
        base: '.',
        read: false
      })
      /*transpile*/
      .pipe(tsDevProject())
      /*flush to disk*/
      .pipe(gulp.dest('.'))
      /*execute tests*/
      .pipe(
        mocha({
          reporter: 'list',
        }),
      )
  );
}
