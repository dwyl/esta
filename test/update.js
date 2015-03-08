var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var UPDATE = require('../lib/update.js');
var FS = require('../lib/fs.js');

test(chalk.cyan('UPDATE a record'), function (t) {
  var rec = {}; // make a copy of record for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  CREATE(record, function(res) {
    t.equal(res.created, true, chalk.green("✓ Record Created " +rec.id));

    READ(rec, function (res2) {
      rec.message = "my new message"; // change message
      // update record in ES
      UPDATE(rec, function(res3) {

        t.equal(res3._version, 2, chalk.green("✓ Record updated (version: "+res3._version +")"));
        // read back the record to confirm it was updated:
        console.log(res3);
        FS.fileExists(rec, function (exists) {
          // console.log(exists);
          t.equal(exists, true, chalk.green("✓ Record (backup) exists"));
        });

        READ(rec, function(res4){
          t.equal(res4._source.message, rec.message, chalk.green("✓ Record message updated to: ")+chalk.cyan(rec.message));
          t.end();
        })
      });
    });
  });
});
