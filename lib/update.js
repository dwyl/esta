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
      var rev = false; // only save a backup version if existing fields updated
      // first get all the keys which were on the originale record:
      var originalkeys = Object.keys(res._source);
      // check if the key/values have been updated or deleted:
      originalkeys.map(function(k){
        // if the value has been updated we set rev to true so we "backup"
        if(res._source[k] !== record[k]){
          rev = true; // its a new version if any of the key/values change
        }
      })
      if(rev) {
        BACKUP(res, function(response) {
          return REQUEST(options, callback);
        });

      else {
        return REQUEST(options, callback);
      }
    }
    else {
      return REQUEST(options, callback);
    }
  });
}
