// After all the other tests have run we need to clear state on DEV for next time

var test  = require('tape');
var chalk = require('chalk');

var FS = require('../lib/index.js').FS;
var D  = require('../lib/fs_delete.js');

// fake record
var record = {
  type: 'tweet',
  index: 'twitter',
  id: Math.floor(Math.random() * (1000000)),
  message: "what evs"
}

// create another few files to exercise :
test(chalk.cyan('Create dummy records to exercise ') + chalk.red('deleteDataDir ') + chalk.cyan('method )'), function (t) {
  record.id = 12345;
  FS.saveFile(record, function(){
    // console.log(' - - - - - - - ');
    // console.log(record.id);
    record.id = 65432;
    FS.saveFile(record, function(){
      // console.log(' - - - - - - - ');
      // console.log(record.id);
      FS.fileExists(record, function (exists) {
        t.equal(exists, true, chalk.green("✓ ") + chalk.red('record created'));
        t.end();
      });

    });
  });
});

test(chalk.cyan('TIDY UP TIME ( delete all files in ') + chalk.red('_data ') + chalk.cyan('directory )'), function (t) {
  D.deleteDataDir(function (err, deleted) {
    t.equal(deleted, true, chalk.green("✓ ") + chalk.red('_data DELETED!'));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, false, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir should no longer exist!"));
      t.end();
    });
  });
});

// NOT Exposing this method in the module because "DROP DATABASE" is too much power!
var DROP  = require('../lib/z_dropindex.js');
var STATS = require('../lib/stats.js');

test( chalk.yellow.bgRed.bold(' - DROP ALL INDEXes so ES is Clean for Next Time - '), function (t) {
  DROP(record, function (res) {
    // console.dir(res);
    STATS(function (res) {
      console.dir(res._shards);
      t.deepEqual(res._all.primaries, {}, chalk.green.bold("✓ ALL Indexes DELETED"));
      t.end();
    });
  });
});
