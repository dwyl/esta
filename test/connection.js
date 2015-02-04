var test  = require('tape');
var chalk = require('chalk');
var ES = require('../lib/index');

test(chalk.cyan('CONNECT to ES on 127.0.0.1:9200'), function (t) {
  ES.CONNECT(function (err, res) {
    t.equal(err, null, chalk.green("✓ No Errors Connecting"));
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});
