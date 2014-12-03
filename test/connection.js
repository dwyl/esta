var test  = require('tape');
var chalk = require('chalk');
var C = require('../lib/connection.js');

test(chalk.yellow('Check we are able to connect to ES on localhost:9200'), function (t) {
  C.checkConnection(function(err,res){
    t.equal(err, null, chalk.green("✓ No Errors Connecting"));
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});
