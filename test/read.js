var test  = require('tape');
var chalk = require('chalk');
var faker = require('faker');

var C = require('../lib/create.js');
var E = require('../lib/read.js');

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
    E.read(rec, function (err2, res2) {
      t.equal(err2, null, chalk.green("✓ No Errors"));
      // console.log(res2)
      t.equal(res2._source.message, rec.message, chalk.green("✓ Record fetched "+res2._id));
      t.end();
    });
  });
});
