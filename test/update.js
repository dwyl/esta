var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record
var UPDATE = require('../lib/update.js');
var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');

test(chalk.cyan('UPDATE a Non-Existant Record (>>UPSERT<<)'), function (t) {
  UPDATE(record, function(response) {
      t.equal(response.created, true, chalk.green("✓ Record not found, create it"));
      t.end();
  });
});

test(chalk.cyan('UPDATE a record'), function (t) {
  record.id = 1234
  var rec = {}, bak = {}; // make a copy of record for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
      bak[key] = record[key];
    }
  }
  CREATE(record, function(res) {
    t.equal(res.created, true, chalk.green("✓ Record Created " +rec.id));

    READ(rec, function (res2) {
      var newmsg = "my new message"
      rec.message = newmsg; // change message
      // update record in ES
      UPDATE(rec, function(res3) {
        t.equal(res3._version, 2, chalk.green("✓ Record updated (version: "+res3._version +")"));
        // restore rec from backup
        for(var key in bak) {
          if(bak.hasOwnProperty(key)) {
            rec[key] = bak[key];
          }
        }
        bak.type = rec.type + "_bak"; // look up the backup record
        bak.id   = rec.id   + "_1";   // with backup id

        READ(bak, function (res5) {
          t.equal(res5.found, true, chalk.green("✓ Record (backup) exists"));
        });

        READ(rec, function(res4) {
          t.equal(res4._source.message, newmsg,
            chalk.green("✓ Record message updated to: ")+chalk.cyan(res4._source.message));
          t.end();
        })
      });
    });
  });
});
