var test  = require('tape');
var chalk = require('chalk');
var RECORD = require('../test/fake_record.js'); // fake record

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var UPSERT = require('../lib/upsert.js');

test(chalk.cyan('UPSERT a *NEW* Record'), function (t) {
  var record = RECORD();
  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  UPSERT(record, function(res){
    t.equal(res.created, true, chalk.green("✓ Record " + res._id + " created > version: "+ res._version));
    t.end();
  });
});

test(chalk.cyan('UPSERT *Existing* Record'), function (t) {
  var record = RECORD();
  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }

  CREATE(record, function (res) {
    t.equal(res.created, true, chalk.green("✓ Record " + res._id + " Created"));
    rec.message = 'new message';

    UPSERT(rec, function (res) {
      READ(rec, function(res4){
        t.equal(res4._source.message, rec.message, chalk.green("✓ Record message updated to: ")+chalk.cyan(rec.message));
        t.end();
      })
    });

  });
});
