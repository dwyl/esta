var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var ES = require('../lib/index');

test(chalk.cyan('E2E CREATE, READ & DELETE a Record'), function (t) {
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
  ES.CREATE(record, function(res) {
    ES.DELETE(rec, function(res3) {
      t.equal(res3.found, true, chalk.green("✓ Record Exists - Lets Delete it!"));
      // should we check for backed up record here...?
      // attempt to read record - it should fail
      ES.READ(rec, function(res4){
        t.equal(res4.found, false, chalk.green("✓ Record Deleted"));
        t.end();
      })
    });
  });
});
