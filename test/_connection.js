var test  = require('tape');
var chalk = require('chalk');

delete process.env.SEARCHBOX_SSL_URL; // ensure we load http (NOT https)!
var ES_URL = '127.0.0.1:9200';
var ES = require('../lib/index');

test(chalk.cyan('CONNECT to ES on ' +ES_URL), function (t) {
  // console.log('process.env.SEARCHBOX_SSL_URL: '+process.env.SEARCHBOX_SSL_URL)
  ES.CONNECT('twitter', function (res) {
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});

test(chalk.cyan('Create a RANDOM index to exercies index creation!'), function (t) {
  var index = new Date().getTime();
  var record = {
    index: index,
    type: 'type',
    id: 1
  }
  ES.CONNECT(index, function(res) {
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});


process.on('uncaughtException', function(err) {
  console.log('ERROR: CANNOT CONNECT TO ELASTICSEARCH ... ' + err);
  console.log("\uD83D\uDCA1  Tip: Remember to start the Vagrant VM and Elasticsearch DB!")
});
