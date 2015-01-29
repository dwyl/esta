var test = require('tape');
var chalk = require('chalk');
var fs = require('fs');
var ES = require('../lib/index');

var fixtures = __dirname + '/fixtures'; // should be esta/test/fixtures
var start = new Date().getTime(); // start timer
var GLOBAL_COUNTER = 0;
var FILECOUNT = 0;

function endTest(t){
  var end  = new Date().getTime();
  var elapsed = (end-start)/1000;
  var writerate = Math.round((FILECOUNT / elapsed), -1);
  var log = chalk.black.bgGreen.bold(' PERFORMANCE >>>> ')
  log = log + chalk.cyan(' ' + FILECOUNT) + chalk.green(' Records READ in ');
  log = log + chalk.cyan(elapsed) + chalk.green(' seconds ') + chalk.yellow(' ~ ');
  log = log + chalk.cyan(writerate) + chalk.green(' records per second');
  console.log(log);

  t.end();
}

function handler (filename, t) {
  // open the file and retrieve the record
  fs.readFile(filename, function(err, data){
    // fileMatch(JSON.parse(data), callback);
    var json;
    var str = data.toString();
    try {
      json = JSON.parse(str);
    } catch (e) {
      GLOBAL_COUNTER--;
      return false;
    }

    var record =  {
      id: json.id,
      type: 'tweet',
      index: 'twitter'
    }
    // READ the record from ES and confirm the text is identical
    ES.READ(record, function(res){
      GLOBAL_COUNTER--;
      // console.log(' >> '+GLOBAL_COUNTER);
      if(GLOBAL_COUNTER === 1) {

        t.equal(json.text, res._source.text, 'ES Record === Fixture Record');
        endTest(t);
      }

    });
  });
}

test(chalk.cyan("READ Performance test"), function(t) {
  // read the fixtures directory and get all records
  fs.readdir(fixtures, function(err, files) {
    // filecount = files.length;
    GLOBAL_COUNTER = FILECOUNT = files.length;
    console.log(' >> '+GLOBAL_COUNTER);
    for(var i in files) {
      var filename = fixtures +'/' +files[i];
      // open the file and extract contents
      handler(filename, t);
    }
  });
});
