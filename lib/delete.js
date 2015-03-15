var OPTIONS = require('./options');
var READ    = require('./read');
var REQUEST = require('./http_request');
var BACKUP  = require('./backup')

module.exports = function del(record, callback) {
  READ(record, function(res) {
    if(res.found) { // record exists back it up
      var options = OPTIONS(record, 'DELETE');
      res._source.deleted = new Date().toISOString();
      BACKUP(res, function(response) {
        return REQUEST(options, callback).end(); // now delete the record
      });
    }
    else { // do nothing ... just return the callback
      return callback(res);
    }
  });
}
