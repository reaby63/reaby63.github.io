const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chokidar = require('chokidar');
const browserSync = require('browser-sync').create();


// ==================================================
// 基本路徑
// ==================================================

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');


// ==================================================
// 狀態
// ==================================================

let isBuilding = false;
let rebuildTimer = null;


// ==================================================
// Build
// ==================================================

function build(callback) {

    if (isBuilding) {

        console.log('⚠️ 目前正在 Build，略過這次觸發');

        return;

    }

    isBuilding = true;

    console.log('');
    console.log('========================================');
    console.log('🔨 開始 Build...');
    console.log('========================================');

    exec('node build.js', {

        cwd: rootDir

    }, (error, stdout, stderr) => {

        isBuilding = false;


        // ------------------------------------------
        // Build 輸出
        // ------------------------------------------

        if (stdout) {
            process.stdout.write(stdout);
        }

        if (stderr) {
            process.stderr.write(stderr);
        }


        // ------------------------------------------
        // Build 失敗
        // ------------------------------------------

        if (error) {

            console.log('');
            console.log('❌ Build 失敗');
            console.log('');

            return;

        }


        // ------------------------------------------
        // Build 成功
        // ------------------------------------------

        console.log('');
        console.log('✅ Build 完成');
        console.log('');


        // ------------------------------------------
        // 執行 callback
        // ------------------------------------------

        if (callback) {
            callback();
        }

    });

}


// ==================================================
// 啟動 Dev Server
// ==================================================

function startDevServer() {

    browserSync.init({

        server: {

            baseDir: distDir

        },

        port: 5500,

        open: true,

        notify: false

    }, () => {

        console.log('');
        console.log('========================================');
        console.log('🚀 Dev Server 啟動');
        console.log('========================================');
        console.log('');

        console.log('網址：');
        console.log('http://localhost:5500');

        console.log('');

        console.log('頁面：');
        console.log('http://localhost:5500/index.html');
        console.log('http://localhost:5500/process.html');
        console.log('http://localhost:5500/about.html');
        console.log('http://localhost:5500/service.html');

        console.log('');

        console.log('✏️ 修改 page / js / styles 後會自動 Build + Reload');

        console.log('');

    });

}


// ==================================================
// 監看檔案
// ==================================================

function startWatcher() {

    const watcher = chokidar.watch([

        // ------------------------------------------
        // 最外層 index.html
        // ------------------------------------------

        path.join(rootDir, 'index.html'),


        // ------------------------------------------
        // page
        // ------------------------------------------

        path.join(rootDir, 'page'),


        // ------------------------------------------
        // js
        // ------------------------------------------

        path.join(rootDir, 'js'),


        // ------------------------------------------
        // styles
        // ------------------------------------------

        path.join(rootDir, 'styles'),


        // ------------------------------------------
        // data
        // ------------------------------------------

        path.join(rootDir, 'data.json')

    ], {

        ignored: [

            path.join(rootDir, 'dist'),

            path.join(rootDir, 'node_modules')

        ],

        ignoreInitial: true,

        persistent: true

    });


    // ==================================================
    // 檔案變更
    // ==================================================

    watcher.on('all', (event, filePath) => {

        const relativePath = path.relative(rootDir, filePath);

        console.log('');
        console.log(`📁 [${event}] ${relativePath}`);


        // ------------------------------------------
        // 防止一次存檔觸發多次
        // ------------------------------------------

        clearTimeout(rebuildTimer);

        rebuildTimer = setTimeout(() => {

            build(() => {

                // Build 完成後刷新瀏覽器
                browserSync.reload();

            });

        }, 300);

    });


    // ==================================================
    // 錯誤
    // ==================================================

    watcher.on('error', error => {

        console.error('');
        console.error('❌ Watcher 錯誤：', error);
        console.error('');

    });


    return watcher;

}


// ==================================================
// 啟動流程
// ==================================================

console.log('');
console.log('========================================');
console.log(' HTML Reset Dev Server');
console.log('========================================');
console.log('');

console.log('🔨 正在進行初始 Build...');


// ==================================================
// 先 Build
// ==================================================

build(() => {

    console.log('========================================');
    console.log('初始 Build 完成');
    console.log('========================================');
    console.log('');


    // ==================================================
    // 再啟動 Server
    // ==================================================

    startDevServer();


    // ==================================================
    // 最後開始監看
    // ==================================================

    startWatcher();

});


// ==================================================
// 結束
// ==================================================

process.on('SIGINT', () => {

    console.log('');
    console.log('停止 Dev Server...');

    browserSync.exit();

    process.exit(0);

});