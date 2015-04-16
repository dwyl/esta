// After all the other tests have run we need to clear state on DEV for next time
var test  = require('tape');
var chalk = require('chalk');
var DROP  = require('./y_drop_it_like_its_hot.js');
var STATS = require('../lib/stats.js');
var record = { // fake record
  type: 'tweet',
  index: 'twitter',
  id: 1
}

test( chalk.yellow.bgRed.bold(' - DROP ALL INDEXes so ES is Clean for Next Time - '), function (t) {
  DROP(record, function (res) {
    STATS(function (res) {
      t.deepEqual(res._all.primaries, {}, chalk.green.bold("✓ ALL ES Indexes DELETED - Tests Pass. Standard."));
      t.end();
    });
  });
});
