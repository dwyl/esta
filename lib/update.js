var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ = require('./read');
var BACKUP  = require('./backup');

module.exports = function update(record, callback) {
  var options = OPTIONS(record, 'POST');
  // asynchronously fetch the record so we can save a copy before updating
  READ(record, function(res) {
    options.body = record; // pass data to be posted
    if(res.found) {
      BACKUP(res, function(response) {
        return REQUEST(options, callback);
      });
    }
    else {
      return REQUEST(options, callback);
    }
  });
}
