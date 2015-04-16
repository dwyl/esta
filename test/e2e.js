var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record

var ES = require('../lib/index');

test(chalk.cyan('E2E CREATE, READ & DELETE a Record'), function (t) {

  ES.CREATE(record, function(res) {
    ES.DELETE(record, function(res3) {
      t.equal(res3.found, true, chalk.green("✓ Record Exists - Lets Delete it!"));
      // should we check for backed up record here...?
      ES.READ(record, function(res4){
        t.equal(res4.found, false, chalk.green("✓ Record Deleted"));
        t.end();
      })
    });
  });
});
