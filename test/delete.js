var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')();
var DELETE = require('../lib/delete.js');

test(chalk.cyan('DELETE a Non-Existant Record'), function (t) {
  DELETE(record, function(response) {
      // console.log(response);
      t.equal(response.found, false, chalk.green("✓ Record not found (no delete performed)"));
      t.end();
  });
});

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
// var FS     = require('../lib/fs.js');

test(chalk.cyan('DELETE a Record'), function (t) {
    var rec = {}, bak = {}; // make a copy of rec for later.
    for(var key in record) {
      if(record.hasOwnProperty(key)) {
        rec[key] = record[key];
        bak[key] = record[key];
      }
    }
  CREATE(record, function(res) {
    // console.log("CREATE res: ")
    // console.log(res);
    // console.log(' - - - - - - - - ')
    // restore record
    for(var key in rec) {
      if(rec.hasOwnProperty(key)) {
        record[key]  = rec[key];
      }
    }
    DELETE(record, function(res3) {
        // console.log(res3);
        t.equal(res3.found, true, chalk.green("✓ Record Existed - So DELETE it!"));
        t.equal(res3.deleted, true, chalk.green("✓ Record DELETEd"));
      // attempt to read record - it should fail
      READ(bak, function(res4) {
        // console.log(" > > > > > > > > > > READ res4 :");
        // console.log(res4)
        // console.log(" < < < < < < < < < < < < < < < < ");
        t.equal(res4.found, false, chalk.green("✓ Record Deletion CONFIRMED"));

        // console.log(' - - - ')
        bak.type = rec.type + "_bak";
        bak.id   = rec.id   + "_" +res._version;
        // console.log(rec);
        // console.log(' - - - ')
        READ(bak, function(res5) {
          // console.log(rec);
          // console.log(' - - - res5')
          // console.log(res5);
          t.equal(res5.found, true, chalk.green("✓ Record was backed up: "+res5._type +'/'+res5._id));
          t.end();
        });
      })
    });
  });
});
