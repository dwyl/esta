var test  = require('tape');
var chalk = require('chalk');
var ES = require('../lib/index');

test(chalk.cyan('CONNECT to ES on 127.0.0.1:9200'), function (t) {
  ES.CONNECT(function (res) {
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});


process.on('uncaughtException', function(err) {
  console.log('ERROR: CANNOT CONNECT TO ELASTICSEARCH ... ' + err);
  console.log("\uD83D\uDCA1  Tip: Remember to start the Vagrant VM and Elasticsearch DB!")
});
