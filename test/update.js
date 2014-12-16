var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var C = require('../lib/create.js');
var R = require('../lib/read.js');
var U = require('../lib/update.js');

test(chalk.yellow('Read a record'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }

  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  C.create(record, function(err, res) {
    t.equal(res.created, true, chalk.green("✓ Record Created " +rec.id));

    R.read(rec, function (err2, res2) {
      rec.message = "my new message"; // change message
      // update record in ES
      U.update(rec, function(err3, res3) {
        t.equal(err3, null, chalk.green("✓ No Errors Updating"));
        t.equal(res3._version, 2, chalk.green("✓ Record updated (version: "+res3._version +")"));
        // read back the record to confirm it was updated:
        R.read(rec, function(err4, res4){
          t.equal(res4._source.message, rec.message, chalk.green("✓ Record message updated to: ")+chalk.blue(rec.message));
          t.end();
        })
      });
    });
  });
});
