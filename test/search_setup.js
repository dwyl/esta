
var ES = require('../lib/index');
var fs = require('fs');
var chalk = require('chalk');
var fixtures = __dirname + '/fixtures'; // should be esta/test/fixtures

// start timer
var start = new Date().getTime();
var count = 0;
var filecount = 0

function processFile(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if(err){
      return console.log('Error obtaining data.', err);
    }
    var str = data.toString();
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    var record = JSON.parse(str);
    for(var key in record) { // delete emtpy proprties
      if(record.hasOwnProperty(key) && record[key] === null) {
        delete record[key];
      }
    }
    ES.CREATE(record, function(res) {
      // if(res.created == true){
      count++;
      // }
      // console.log(count + ' of ' + filecount);
      if(filecount === count+1){
        var end  = new Date().getTime();
        var elapsed = (end-start)/1000;
        var writerate = Math.round((filecount / elapsed), -1);
        var log = chalk.black.bgGreen.bold('PERFORMANCE >>>> ') + chalk.cyan(' ' + filecount) + chalk.green(' Records Inserted in ');
        log = log + chalk.cyan(elapsed) + chalk.green(' seconds ') + chalk.yellow(' ~ ');
        log = log + chalk.cyan(writerate) + chalk.green(' records per second');
        console.log(log);
        return callback();
      }
    });
  });
}

function loadFixtures(callback){
  fs.readdir(fixtures, function(err, files) {
    filecount = files.length;
    // console.log(' >> '+filecount);
    for(var i in files) {
      var file = fixtures +'/' +files[i];
      processFile(file, callback);
    }
  });
}


loadFixtures(function() {
  console.log(chalk.black.bgGreen.bold(' - - - - - - - now we can search...'));
  // twitter_tweet_559464234510471200
  var record = {
    type: 'tweet',
    index: 'twitter',
    id: 559464234510471200
  }
  ES.READ(record, function(rec){
    console.log(rec._source.text);
  });
  // curl 127.0.0.1:9200/_all/tweet/_search?q=text:amazing

});
