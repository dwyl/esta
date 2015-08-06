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
  var bak = {}; // make a copy of record for later.
  bak.index = record.index;
  bak.type  = record.type + "_bak";

  CREATE(record, function(res) {
    console.log(" > > > > CREATE res:")
    console.log(res);
    var newmsg = "everything is awesome";
    record.message = newmsg;

    UPDATE(record, function(res2) {
      // confirm the record was UPDATED (first time)
      READ(record, function(response) {
        t.equal(response._source.message, newmsg, chalk.green("✓ Record updated: "+response._version));
      })

      t.equal(res2._version, 2, chalk.green("✓ Record updated to: "+res2._version));
      // check the backup record was created:
      bak.id    = record.id   + "_1" //+res._version; // original record

      READ(record, function(res3) {
        console.log(" > > > > res3:")
        console.log(res3);
        t.equal(res3.found, true, chalk.green("✓ BACKUP Record exists: " + res3._id));
        var final = "it's the final countdown!";
        record.message = final;

        UPDATE(record, function(res4){
          t.equal(res4._version, 3, chalk.green("✓ Record updated: "+ res4._version));
          // check the backup record was created:
          bak.id    = record.id   + "_2";
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

test(chalk.magenta('UPDATE KEY Without BACKUP!'), function(t){
  var record = require('./fake_record')();
  record.me = 'ow!'
  CREATE(record, function(res) {
    t.ok(res.created === true, "record created");
    console.log(' - - - - - - - - - - - - - - - - - - - - record:');
    console.log(res);
    READ(record, function(res1){
      t.ok(res1._source.me === record.me, "record created");
    })
    record.hello = 'world'; // set the value of a new key
    UPDATE(record, function(res2){
      t.ok(res2.created === false, "Record was updated (created is false)");
      READ(record, function(res3){
        console.log(' - - - - - - - - - - - - - - - - - - - - RES3 :');
        t.ok(res3._source.hello === 'world', "new key was added to record");
        t.ok(res3._version === 2, "Version is "+res3._version);
      })

      // CONFIRM a Backup was NOT created:
      record.type  = res2._type + "_bak" // http://en.wikipedia.org/wiki/Bak_file
      record.id    = res2._id +"_1";
      READ(record, function(res){
        console.log(' - - - - - - - - - - - - - - - - - - - - RES BACKUP??');
        console.log(res)
        console.log(res.found === false, "NO Backup Found! (Only a new k/v was set)");
        // t.ok(true === true, '>>>>>>>>>>>>>>>>>>>>> TRUE!');
        t.end();
      }); // end READ inside UPDATE
    }) // end UPDATE
  }); // end CREATE
}); // close test

process.on('uncaughtException', function(err) {
  console.log('ERROR: BACKUP Error ' + err);
  // console.log("\uD83D\uDCA1  Tip: Remember to start the Vagrant VM and Elasticsearch DB!")
});
