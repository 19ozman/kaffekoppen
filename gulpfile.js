const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create();

function style() {
	return gulp
		.src("./app/scss/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./app/css"))
		.pipe(browserSync.stream());
}

gulp.task("default", function () {
	return gulp.src("./app/css/main.css").pipe(csso()).pipe(gulp.dest("./dist"));
});

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
			// proxy: "http://localhost:3000/", LÄS PÅ OM PROXY .dev
		},
	});
	gulp.watch("./app/scss/**/*.scss", style);
	gulp.watch("./*html").on("change", browserSync.reload);
	gulp.watch("./app/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
