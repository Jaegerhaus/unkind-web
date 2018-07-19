import gulp from "gulp";
import mocha from "gulp-spawn-mocha";
import rimraf from "rimraf";
import webpack from "webpack";

import developmentConfig from "./config.development";
import productionConfig from "./config.production";

const config = "production" == process.env.NODE_ENV
  ? productionConfig
  : developmentConfig;

gulp.task("test", () =>
  gulp.src(config.path.test, { read: false })
    .pipe(mocha(config.mocha))
);

gulp.task("clean", done => {
  rimraf(config.path.output, done);
});

gulp.task("watch", () => {
  config.watch = true;
  gulp.start("client");
});

gulp.task("server", done => {
  webpack(config.webpack.server, (err, stats) => {
    console.log(stats.toString(config.webpackStatsPresets.minimal));
    done();
  });
});

gulp.task("client", done => {
  webpack(config.webpack.client, (err, stats) => {
    console.log(stats.toString(config.webpackStatsPresets.minimal));
    if (!config.watch)
      done();
  });
});
