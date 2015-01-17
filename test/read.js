var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');

test(chalk.cyan('READ a record'), function (t) {
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
  CREATE(record, function(res) {
    t.equal(res.created, true, chalk.green("✓ Record Created " +rec.id));
    READ(rec, function (res2) {
      // console.log(res2)
      t.equal(res2._source.message, rec.message, chalk.green("✓ Record fetched " + res2._id + " " + res2._source.message));
      t.end();
    });
  });
});

test(chalk.cyan('READ a record that does not exist (expect found === false)'), function (t) {
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: Math.floor(Math.random() * (1000000)),
    message: faker.hacker.phrase()
  }
  READ(record, function (res2) {
    t.equal(res2.found, false, chalk.green("✓ Record " + res2._id + " Not Found (as expected)"));
    t.end();
  });
});
