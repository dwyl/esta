// to avoid people accidentally (or maliciously) deleting records
// we are not going to provide these methods to any end-users
// but we still need them for the tests

var fs = require('fs');
var path = require('path');

var dataDir = __dirname + '/../_data'; //
dataDir = path.resolve(dataDir);

function unlinkHandler(file, last, callback) {
  fs.unlink(dataDir + '/' +file, function(err) {
    console.log('is last ? '+last);
    if(last) {
      fs.rmdir(dataDir, function() {
        callback(err, true);
      });
    } else {
      // do nothing - stupid branch coverage.
    }
  });
}

function deleteDataDir (callback) {
  // delete all files in _data dir
  fs.readdir(dataDir, function(err, files) {
    var filecount = files.length
    console.log(files +" " + filecount);
    // loop through list of files and remove them
    for(var i in files) { // *assume* there's always at least one file
      var file = files[i]; // this method is NOT PUBLIC
      // console.log(i + ' Deleting  ' +file);
      unlinkHandler(file, (parseInt(i, 10) === filecount-1), callback);
    }
  });
}


module.exports = {
  deleteDataDir : deleteDataDir
}
