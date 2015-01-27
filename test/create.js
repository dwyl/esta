var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record

var CREATE = require('../lib/create.js');

test(chalk.cyan('CREATE a record'), function (t) {
  CREATE(record, function (res) {
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});

test(chalk.cyan('CREATE a record without specifying index, type or id!'), function (t) {
  delete record.id;
  delete record.index;
  delete record.type;
  CREATE(record, function (res) {
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});
