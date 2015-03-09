var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ = require('./read');
// var FS = require('./fs');
var BACKUP  = require('./backup')

module.exports = function update(record, callback) {
  var options = OPTIONS(record, 'POST');
  // asynchronously fetch the record so we can save a copy before updating
  READ(record, function(res) {
    // console.log(res);
    // res.index = res._index;
    // res.type  = res._type;
    // res.id    = res._id;
    if(res.found) {
      // var bak = {};
      // for(var key in record) { // clone record
      //   if(record.hasOwnProperty(key)) {
      //     bak[key]  = record[key];
      //   }
      // }
      BACKUP(res, function(response) {
        var req = REQUEST(options, callback);
        req.write(JSON.stringify(record));    // save latest version
        return req.end();
      });
    }
    else {
      var req = REQUEST(options, callback);
      req.write(JSON.stringify(record));
      return req.end();
    }
    // now return the request object with DELETE operation:
  });


  // READ(record, function(err, res) {
  //   // console.log(err);
  //   FS.saveFile(record, function(err, filename) {
  //     // console.log(' - - - Previous Version Saved : '+filename);
  //   });
  //   // now the actual update part
  //
  // });
}
