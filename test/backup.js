var test   = require('tape');
var chalk  = require('chalk');
var record = require('./fake_record.js')();
var UPDATE = require('../lib/update.js')
var DELETE = require('../lib/delete.js');
var CREATE = require('../lib/create.js');
var READ   = require('../lib/read.js');
// var FS     = require('../lib/fs.js');

test(chalk.cyan('BACKUP a Record (*Twice*!)'), function (t) {
  record.message = "Original Message";
  var rec = {}, bak = {}; // make a copy of record for later.
  for(var key in record) {
    if(record.hasOwnProperty(key)) {
      rec[key]  = record[key];
      bak[key]  = record[key];
    }
  }
  CREATE(record, function(res) {
    console.log(" > > > > CREATE res:")
    console.log(res);
    var newmsg = "everything is awesome";
    // restore record from rec
    for(var key in rec) {
      if(rec.hasOwnProperty(key)) {
        record[key]  = rec[key];
      }
    }
    record.message = newmsg;
    UPDATE(record, function(res2) {

      // confirm the record was UPDATED (first time)
      READ(rec, function(response) {
        // console.log(" > > > > response:")
        // console.log(response);
        t.equal(response._source.message, newmsg, chalk.green("✓ Record updated: "+response._version));
      })

      t.equal(res2._version, 2, chalk.green("✓ Record updated to: "+res2._version));
      // check the backup record was created:
      bak.type  = rec.type + "_bak";
      bak.id    = rec.id   + "_1" //+res._version; // original record
      READ(bak, function(res3) {
        console.log(" > > > > res3:")
        console.log(res3);
        t.equal(res3.found, true, chalk.green("✓ BACKUP Record exists: " + res3._id));
        // restore record from rec (Again!)
        for(var key in rec) {
          if(rec.hasOwnProperty(key)) {
            record[key]  = rec[key];
          }
        }
        var final = "it's the final countdown!";
        record.message = final;
        UPDATE(record, function(res4){
          t.equal(res4._version, 3, chalk.green("✓ Record updated: "+ res4._version));
          // check the backup record was created:
          bak.type  = rec.type + "_bak";
          bak.id    = rec.id   + "_2";
          READ(bak, function(res5) {
            console.log(" > > > > res5:")
            console.log(res5);
            t.equal(res5.found, true, chalk.green("✓ BACKUP Record 2 exists"));
            // should have the *previous* version of the message
            t.equal(res5._source.message, newmsg, chalk.green("✓ Record updated"));
            t.end();
          }) // end READ 2
          READ(record, function(res6) {
            t.equal(res6._source.message, final, chalk.green("✓ Final message: " + final));

          });
        }) // end UPDATE 2

      }); // end READ
    }); // end UPDATE 1

  });
});

process.on('uncaughtException', function(err) {
  console.log('ERROR: BACKUP Error ' + err);
  // console.log("\uD83D\uDCA1  Tip: Remember to start the Vagrant VM and Elasticsearch DB!")
});
