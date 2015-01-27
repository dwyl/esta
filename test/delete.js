var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')();

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var DELETE = require('../lib/delete.js');
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
        t.equal(res3.found, true, chalk.green("✓ Record Existed - So Delete it!"));
      // attempt to read record - it should fail
      READ(rec, function(res4){
        t.equal(res4.found, false, chalk.green("✓ Record Deleted"));
        console.log(' - - - ')
        console.log(rec);
        console.log(' - - - ')
        FS.fileExists(rec, function(exists) {
          t.equal(exists, true, chalk.green("✓ Record was backed up"));
          t.end();
        });
      })
    });
  });
});
