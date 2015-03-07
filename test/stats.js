var test  = require('tape');
var chalk = require('chalk');

var STATS = require('../lib/stats.js');

test(chalk.cyan('ES Cluster Stats'), function (t) {
  STATS(function (res) {
    // console.log(res._all.primaries.docs.count)
    t.equal(res._all.primaries.docs.count > 500, true, chalk.green.bold("✓ " + res._all.primaries.docs.count + " Records"));
    t.end();
  });
});
