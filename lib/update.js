var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ = require('./read');
var FS = require('./fs');

module.exports = function update(record, callback) {
  // asynchronously fetch the record so we can save a copy before updating
  READ(record, function(err, res) {
    console.log(err);
    FS.saveFile(record, function(err, filename) {
      console.log(' - - - Previous Version Saved : '+filename);
    });
    // now the actual update part
    var options = OPTIONS(record, 'PUT');
    var req = REQUEST(options, callback);
    req.write(JSON.stringify(record));
    req.end();
  });
}
