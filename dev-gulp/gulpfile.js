import gulp from "gulp";
import gulpIf from "gulp-if";
import dotenv from "dotenv";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
import htmlExtend from "gulp-html-extend";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";
import sass from "sass";
import pug from "gulp-pug";
import htmlmin from "gulp-htmlmin";
import browserSyncPkg from "browser-sync";
import { spawn } from 'child_process';
import fs from "fs-extra";
import path from "path";
import merge from "merge-stream";
import minimist from "minimist"

// `browser-sync` 需要顯示創建實例
const browserSync = browserSyncPkg;

// 解析 CLI 參數
const options = minimist(process.argv.slice(2));

// 加載 .env 文件中的變數
dotenv.config();

// 優先使用 CLI 的 --env，其次是 .env 的 NODE_ENV，最後預設 development
const env = options.env || process.env.NODE_ENV || "development";
const isProd = (env === "production" || env === "pro") || (process.env.IS_PROD === "true");

const isWriteMaps = process.env.IS_WRITE_MAPS === 'true' || false;
const isWatchScripts = process.env.IS_WATCH_SCRIPTS === 'true' || false;
const isWatchStyles = process.env.IS_WATCH_STYLES === 'true' || false;

console.log(`編譯模式 : ${env} 是否壓縮 : ${isProd}`);

// 初始化 sass 編譯器
const sassCompiler = gulpSass(sass);

// 路徑配置
const paths = {
  html: {
    src: 'src/**/!(_)*.html',
    dest: 'dist'
  },
  pug: {
    src: 'src/pug/**/!(_)*.pug',
    focus: 'src/pug/**/*.pug',
    dest: 'dist'
  },
  styles: {
    src: 'src/scss/**/*.{sass,scss}',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/scripts/'
  },
  img: {
    src: 'src/img/**/*',
    dest: 'dist/img/'
  },
  fonts: {
    src: `src/fonts/**/*`,
    dest: `dist/fonts/`
  },
};

// 共用函式
function checkAndCopy(srcDir, destDir, cb, label = "任務") {
  // 檢查資料夾是否存在 & 是否有檔案
  if (!fs.existsSync(srcDir) || fs.readdirSync(srcDir).length === 0) {
    console.log(`⚠️ 沒有 ${label} 資料夾或裡面沒有檔案，跳過輸出`);
    return cb();
  }

  fs.emptyDir(destDir, (err) => {
    if (err) {
      console.error(`❌ 清空 ${destDir} 失敗:`, err);
      return cb(err);
    }

    console.log(`🗑️ 已清空 ${destDir}`);

    fs.copy(srcDir, destDir, (err) => {
      if (err) {
        console.error(`❌ 搬移 ${label} 失敗:`, err);
        return cb(err);
      }
      console.log(`✔ 已搬移 ${label} 到 ${destDir}`);
      browserSync.reload();
      cb();
    });
  });
}

// 編譯 Sass 並壓縮 CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init()) // 初始化 sourcemaps
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // 使用 sassCompiler
    .pipe(postcss([autoprefixer({
      overrideBrowserslist: ['last 5 version'],
      grid: false,
      remove: false,
    })])) // 使用 autoprefixer 添加前綴
    .pipe(gulpIf(isProd, cleanCSS())) // 壓縮 CSS
    .pipe(gulpIf(isWriteMaps, sourcemaps.write('.'))) // 寫入 sourcemaps
    .pipe(gulp.dest(paths.styles.dest)) // 輸出到目標路徑
    .pipe(browserSync.stream()); // 更新瀏覽器
}

// 合並&壓縮 JavaScript
// 共用 JS (plugin + 共用工具)
async function commonScripts() {
  const babel = (await import('gulp-babel')).default;
  return gulp.src([
      'src/js/vendor/jquery/jquery-3.4.1.min.js',
      'src/js/vendor/swiper/swiper.min.js',
      'src/js/vendor/aos/aos.js',
      'src/js/vendor/fancybox/jquery.fancybox.min.js',
      'src/js/vendor/mastercss/master-css.js'
    ])
    .pipe(sourcemaps.init())
    // .pipe(concat(isProd ? 'plugin.min.js' : 'plugin.js'))
    .pipe(concat('plugin.min.js'))
    // .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(uglify())
    .pipe(gulpIf(isWriteMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// 專案 JS
async function scripts() {
  const babel = (await import('gulp-babel')).default;
  return gulp.src([
      paths.scripts.src,
      '!src/js/vendor/**'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat(isProd ? 'custom.min.js' : 'custom.js'))
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(gulpIf(isProd, uglify()))
    .pipe(gulpIf(isWriteMaps, sourcemaps.write('.')))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// 處理 HTML 任務
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlExtend({ annotations: false, verbose: false })) // 啟用注釋&詳細log
    .pipe(gulp.dest(paths.html.dest)) // 輸出文件
    .pipe(browserSync.stream());
}

// 編譯 Pug
function compilePug() {
  return gulp.src(paths.pug.src) // 護取所有 Pug 文件
    .pipe(pug({
      pretty: true // 如果需要不壓縮的 HTML，可以設置為 true
    }))
    .pipe(htmlmin({ // 可選：壓縮 HTML 文件
      collapseWhitespace: false,
      removeComments: false
    }))
    .pipe(gulp.dest(paths.pug.dest)) // 輸出到目標文件夾
    .pipe(browserSync.stream());    // 實現即時刷新
}

// 搬移圖片
function img(cb) {
  checkAndCopy("src/img/", "dist/img/", cb, "圖片");
}

// 搬移字體
function fonts(cb) {
  checkAndCopy("src/fonts/", "dist/fonts/", cb, "字型");
}

// 清理 dist 資料夾
function clean(cb) {
  fs.emptyDir('dist', cb);
}

// 啟動 PHP 伺服器
function phpServer(cb = () => { }) {
  const php = spawn('php', ['-S', 'localhost:8000', '-t', 'dist']);

  php.stdout.on('data', (data) => {
    console.log(`PHP: ${data}`);
  });

  php.stderr.on('data', (data) => {
    console.error(`PHP Error: ${data}`);
  });

  process.on('exit', () => {
    php.kill();
  });

  if (typeof cb === 'function') cb();
}

// 監控文件變化並自動刷新
function watchFiles() {
  if (env === 'php') {
    phpServer();

    browserSync.init({
      proxy: 'http://localhost:8000', // 代理 PHP server
      port: 3000,
      open: true,
      notify: false
    });
  } else {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
  }

  if (isWatchStyles) {
    gulp.watch(paths.styles.src, styles);
  }

  if (isWatchScripts) {
    gulp.watch(paths.scripts.src, gulp.series(commonScripts, scripts));
  }

  gulp.watch(paths.img.src, img);
  gulp.watch(paths.fonts.src, fonts);

  switch (env) {
    case 'pug':
      gulp.watch(paths.pug.focus, compilePug); // 監控 Pug 文件
      gulp.watch('./*.html').on('change', browserSync.reload);
      break;
    case 'php':
      gulp.watch('dist/**/*.php').on('change', browserSync.reload);
      break;
    default:
      gulp.watch(paths.html.src, html);
      gulp.watch('./*.html').on('change', browserSync.reload);
      break;
  }
}

// 定義任務
const build = gulp.series(clean, gulp.parallel(
  compilePug,
  styles,
  commonScripts,
  scripts,
  img,
  fonts
));
const dev = gulp.series(build, watchFiles);

// 導出任務
export {
  html,
  compilePug,
  styles,
  commonScripts,
  scripts,
  img,
  fonts,
  dev,
  build
};
