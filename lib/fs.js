var fs = require('fs');
var path = require('path');

var dataDir = __dirname + '/../_data'; //
dataDir = path.resolve(dataDir);

// check if the local filesytem is writeable
function dataDirExists (callback) {
  fs.exists(dataDir, function (exists) {
    // util.debug(exists ? "it's there" : "no _data dir");
    callback(null, exists);
  });
}

function createDataDir (callback) {
  fs.mkdir(dataDir, function() {
    callback(null, true);
  });
}


function createDataDirIfNotExists (callback) {
  dataDirExists(function(err, exists) {
    if (!exists) {
      createDataDir(function(err, created) {
        callback(err, created);
      })
    } else {
      callback(err, false);
    }
  });
}

function recordName(record) {
  return dataDir + '/' + record.index
  + '_' + record.type + '_' + record.id + '.json';
}

function fileExists(record, callback) {
  var file = recordName(record);
  fs.exists(file, function (exists) {
    callback(null, exists);
  });
}

function saveFile(record, callback) {
  var file = recordName(record);
  record = JSON.stringify(record);
  fs.writeFile(file, record, function(err) {
    callback(err);
  });
}

module.exports = {
  dataDirExists : dataDirExists,
  createDataDir : createDataDir,
  // deleteDataDir : deleteDataDir,
  createDataDirIfNotExists : createDataDirIfNotExists,
  fileExists : fileExists,
  saveFile : saveFile,
  // deleteFile : deleteFile
}
