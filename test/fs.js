var test  = require('tape');
var chalk = require('chalk');
// var FS = require('../lib/fs.js');
var FS = require('../lib/index.js').FS;
var D  = require('../lib/fs_delete.js');

test(chalk.cyan('CHECK if a ') + chalk.red('_data ') + chalk.cyan('directory exists'), function (t) {
  FS.dataDirExists(function (err, exists) {
    // console.log(exists);
    t.equal(exists, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir does NOT exist on startup"));
    t.end();
  });
});

test(chalk.cyan('CREATE the ') + chalk.red('_data ') + chalk.cyan('directory'), function (t) {
  FS.createDataDir(function (err, created) {
    t.equal(created, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("CREATED!"));
    // console.log(' ----> '+created);
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir exists cause we created it!"));
      t.end();
    });
  });
});

test(chalk.cyan('DELETE the ') + chalk.red('_data ') + chalk.cyan('directory'), function (t) {
  D.deleteDataDir(function (err, deleted) {
    t.equal(deleted, true, chalk.green("✓ ") + chalk.red('_data DELETED!'));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, false, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir was deleted"));
      t.end();
    });
  });
});

test(chalk.cyan('CREATE the ') + chalk.red('_data ') + chalk.cyan('directory if it Does NOT already Exist'), function (t) {
  FS.createDataDirIfNotExists(function (err, created) {
    t.equal(created, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("CREATED!"));
    FS.dataDirExists(function (err, exists) {
      t.equal(exists, true, chalk.green("✓ ") + chalk.red('_data ') + chalk.green("dir exists cause we created it!"));
    });
    // its already created at this point so it will not create twice
    FS.createDataDirIfNotExists(function (err, created) {
      t.equal(created, false);
      t.end();
    });
  });


});

var record = require('../test/fake_record.js')(); // fake record

test(chalk.cyan('Check if a FILE (record) exists'), function (t) {
  FS.fileExists(record, function (exists) {
    t.equal(exists, false, chalk.green("✓ ") + chalk.red('record did not exists'));
    t.end();
  });
});

test(chalk.cyan('Create a FILE (record)'), function (t) {
  FS.fileExists(record, function (exists) {
    t.equal(exists, false, chalk.green("✓ ") + chalk.red('record did not exists'));
    FS.saveFile(record, function (err) {
      t.equal(err, null, chalk.green("✓ no error creating the file"));
      t.end();
    });
  });
});

test(chalk.cyan('Create a NEW Version of a record'), function (t) {
  record.id = '987654';
  FS.fileExists(record, function (exists) {
    // t.equal(exists, false, chalk.green("✓ ") + chalk.red('record did not exists'));
    FS.saveFile(record, function (err) {
      // attempt to save it a second time to see if it creates a new version
      FS.saveFile(record, function (err2) {
        record.id = '987654-1'; // revision 1
        FS.fileExists(record, function(exists) {
          t.equal(exists, true, chalk.green("✓ revision 1 exists"));
          record.id = '987654'; // reset id back to original
          FS.saveFile(record, function (err2) {
            record.id = '987654-2'; // revision 2
            FS.fileExists(record, function(exists) {
              t.equal(exists, true, chalk.green("✓ second revision exists"));
              t.end();
            });
          });
        });
      });
    });
  });
});
