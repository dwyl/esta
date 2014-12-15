var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var C = require('../lib/create.js');

test(chalk.yellow('Create a record'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }

  // console.log(record);
  C.create(record, function (err, res) {
    t.equal(err, null, chalk.green("✓ No Errors"));
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});

test(chalk.yellow('Create a record without specifying index, type or id!'), function (t) {
  var record = {
    message: faker.hacker.phrase()
  }

  // console.log(record);
  C.create(record, function (err, res) {
    t.equal(err, null, chalk.green("✓ No Errors"));
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});
