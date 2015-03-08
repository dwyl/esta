var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')();
var DELETE = require('../lib/delete.js');

test(chalk.cyan('DELETE a Non-Existant Record'), function (t) {
  DELETE(record, function(response) {
      console.log(response);
      t.equal(response.found, false, chalk.green("✓ Record not found (no delete performed)"));
      t.end();
  });
});

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var FS     = require('../lib/fs.js');

test(chalk.cyan('DELETE a Record'), function (t) {
  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  CREATE(record, function(res) {
    DELETE(rec, function(res3) {
        // console.log(res3);
        t.equal(res3.found, true, chalk.green("✓ Record Existed - So DELETE it!"));
        t.equal(res3.deleted, true, chalk.green("✓ Record DELETEd"));
      // attempt to read record - it should fail
      READ(rec, function(res4){
        t.equal(res4.found, false, chalk.green("✓ Record Deletion CONFIRMED"));
        // console.log(' - - - ')
        // console.log(rec);
        // console.log(' - - - ')
        FS.fileExists(rec, function(exists) {
          t.equal(exists, true, chalk.green("✓ Record was backed up"));
          t.end();
        });
      })
    });
  });
});
