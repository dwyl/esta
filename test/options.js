var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var OPTIONS = require('../lib/options.js');

test(chalk.cyan('Post OPTIONS object'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }

  var opts = OPTIONS(record, 'DELETE');
  t.equal(opts.method, 'DELETE', chalk.green("✓ Options Works"));
  t.end();
});
