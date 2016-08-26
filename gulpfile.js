/*this file is required for Sass compile via Gulp*/

'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var bourbon = require('node-bourbon');
//
//test branch to see that gulp actually works; test by running gulp in cli
// gulp.task('default', function() {
//   console.log('hi');
// })

 
gulp.task('sass', function () {
	/*will search for and compile all Sass files*/
  	gulp.src('assets/scss/app.scss')

    //.pipe(sass().on('error', sass.logError))
    /*converts Sass to CSS within gulp-sass*/
    .pipe(sass({
    	includePaths: require('node-bourbon').includePaths
    }))
    	//includePaths: ['styles'].concat(neat)
    
    /*default css destination, Gulp will create this file*/
    .pipe(gulp.dest('assets/styles'));
});
 
gulp.task('sass:watch', function () {
	/*listens to Sass*/
  gulp.watch('assets/scss/*.scss', ['sass']);
});