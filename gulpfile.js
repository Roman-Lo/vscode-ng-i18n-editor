const { task, watch } = require('gulp');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');
const IS_WIN32 = process.platform === 'win32';
const TSC_LINE = /\d{1,2}:\d{1,2}:\d{1,2} [AP]M - (.+)/;

var indexHtmlFile = __dirname + '/src/editor/index.html';
var targetFile = __dirname + '/out/editor/index.html';

task('watch', function (cb) {
  const dir = path.join(__dirname, '/out/editor');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tsc = cp.spawn(path.resolve(__dirname, 'node_modules/.bin/', IS_WIN32 ? 'tsc.cmd' : 'tsc'), ['-watch', '-p', './'], {
    cwd: __dirname,
    stdio: ['ignore', 'pipe', 'ignore']
  })
    .on('close', function () {
      console.log('closed!');
      cb();
    })
    .on('error', function (err) {
      console.log(err);
    });

  tsc.stdout.on("data", function (line) {
    line = line.toString();
    if (line.match(TSC_LINE)) {
      console.log(line);
    }
  });

  watch(indexHtmlFile, { ignoreInitial: false, delay: 200 }, function (wcb) {
    fs.copyFile(indexHtmlFile, targetFile, (err) => {
      if (err) {
        console.warn(err);
      }
      wcb();
    });
  });
});