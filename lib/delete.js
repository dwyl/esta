// var FS      = require('./fs'); // NOT the node core module!
var OPTIONS = require('./options');
var READ    = require('./read');
var REQUEST = require('./http_request');
var BACKUP  = require('./backup')

module.exports = function del(record, callback) {

  READ(record, function(res) {
    var options = OPTIONS(record, 'DELETE');

    if(res.found) { // record exists back it up
      BACKUP(res, function(response) {
        // now delete it:
        return REQUEST(options, callback).end();
      });
    } else {
      // do nothing ... just return the callback
      return callback(res);
    }
  });
}
