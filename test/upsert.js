var test  = require('tape');
var chalk = require('chalk');
var RECORD = require('../test/fake_record.js'); // fake record

var CREATE = require('../lib/create.js');
var READ = require('../lib/read.js');
var UPDATE = require('../lib/update.js');

test(chalk.cyan('UPSERT a *NEW* Record'), function (t) {
  var record = RECORD();
  var rec = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
    }
  }
  UPDATE(record, function(res){
    t.equal(res.created, true, chalk.green("✓ Record " + res._id + " created > version: "+ res._version));
    t.end();
  });
});

test(chalk.cyan('UPSERT *Existing* Record'), function (t) {
  var record = RECORD();
  var rec = {}, bak = {}; // make a copy of rec for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key] = record[key];
      bak[key] = record[key];
    }
  }

  CREATE(record, function (res) {
    t.equal(res.created, true, chalk.green("✓ Record " + res._id + " Created"));
    var newmsg = 'new message'
    rec.message = newmsg;

    UPDATE(rec, function (res) {
      READ(bak, function(res4){
        t.equal(res4._source.message, newmsg, chalk.green("✓ Record message updated to: ")+chalk.cyan(rec.message));
        t.end();
      })
    });

  });
});
