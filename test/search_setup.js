var ES = require('../lib/index');
var fs = require('fs');
var chalk = require('chalk');
var fixtures = __dirname + '/fixtures';
// start timer
var start = new Date().getTime();
var count = 0;
var filecount = 0

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

loadFixtures(function() {
  console.log(chalk.black.bgGreen.bold(' - - - - - - - now we can search...'));
});
