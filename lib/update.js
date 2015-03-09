var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ = require('./read');
var BACKUP  = require('./backup');

module.exports = function update(record, callback) {
  var options = OPTIONS(record, 'POST');
  // asynchronously fetch the record so we can save a copy before updating
  READ(record, function(res) {
    if(res.found) {
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
  });
}
