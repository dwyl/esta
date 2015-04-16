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
  var bak = {
    index: record.index,
    type: record.type + "_bak",
    id: record.id   + "_1"
  };

  CREATE(record, function(res) {
    t.equal(res.created, true, chalk.green("✓ Record Created " +record.id));

    READ(record, function (res2) {
      var newmsg = "my new message"
      record.message = newmsg; // change message
      // update record in ES
      UPDATE(record, function(res3) {
        t.equal(res3._version, 2, chalk.green("✓ Record updated (version: "+res3._version +")"));

        READ(bak, function (res5) {
          t.equal(res5.found, true, chalk.green("✓ Record (backup) exists"));
        });

        READ(record, function(res4) {
          t.equal(res4._source.message, newmsg,
            chalk.green("✓ Record message updated to: ")+chalk.cyan(res4._source.message));
          t.end();
        })
      });
    });
  });
});
