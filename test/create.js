var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var CREATE = require('../lib/create.js');

test(chalk.cyan('CREATE a record'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }

  CREATE(record, function (err, res) {
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});

test(chalk.cyan('CREATE a record without specifying index, type or id!'), function (t) {
  var record = {
    message: faker.hacker.phrase()
  }

  CREATE(record, function (err, res) {
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});
