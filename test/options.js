var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record

var OPTIONS = require('../lib/options.js');

test(chalk.cyan('Post OPTIONS object'), function (t) {
  var opts = OPTIONS(record, 'DELETE');
  t.equal(opts.method, 'DELETE', chalk.green("✓ Options Works"));
  t.end();
});
