var test  = require('tape');
var chalk = require('chalk');
var DELETE = require('../lib/delete.js');
var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var record = require('./fake_record.js')();

test(chalk.cyan('DELETE a Non-Existant Record'), function (t) {
  DELETE(record, function(response) {
      // console.log(response);
      t.equal(response.found, false, chalk.green("✓ Record not found (no delete performed)"));
      t.end();
  });
});

test(chalk.cyan('DELETE a Record'), function (t) {
    var rec = {}, bak = {}; // make a copy of rec for later.
    for(var key in record) {
      if(record.hasOwnProperty(key)) {
        rec[key] = record[key];
        bak[key] = record[key];
      }
    }
  CREATE(record, function(res) {

    for(var key in rec) {
      if(rec.hasOwnProperty(key)) {
        record[key]  = rec[key];
      }
    }
    DELETE(record, function(res3) {

        t.equal(res3.found, true, chalk.green("✓ Record Existed - So DELETE it!"));
        t.equal(res3.deleted, true, chalk.green("✓ Record DELETEd"));

      READ(bak, function(res4) { // attempt to read record - it should fail

        t.equal(res4.found, false, chalk.green("✓ Record Deletion CONFIRMED"));

        bak.type = rec.type + "_bak";
        bak.id   = rec.id   + "_" +res._version;

        READ(bak, function(res5) {
          t.equal(res5.found, true, chalk.green("✓ Record was backed up: "+res5._type +'/'+res5._id));
          t.end();
        });
      })
    });
  });
});
