// After all the other tests have run we need to clear state on DEV for next time

var test  = require('tape');
var chalk = require('chalk');

// fake record
var record = {
  type: 'tweet',
  index: 'twitter',
  id: Math.floor(Math.random() * (1000000)),
  message: "what evs"
}

// NOT Exposing this method in the module because "DROP DATABASE" is too much power!
var DROP  = require('../lib/z_teardown.js');
var STATS = require('../lib/stats.js');

test( chalk.yellow.bgRed.bold(' - DROP ALL INDEXes so ES is Clean for Next Time - '), function (t) {
  DROP(record, function (res) {
    // console.dir(res);
    STATS(function (res) {
      console.dir(res._shards);
      t.deepEqual(res._all.primaries, {}, chalk.green.bold("✓ ALL Indexes DELETED"));
      t.end();
    });
  });
});
