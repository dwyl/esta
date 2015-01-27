var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ    = require('./read');
var FS      = require('./fs');

module.exports = function del(record, callback) {
  var options = OPTIONS(record, 'DELETE');

  READ(record, function(err, res) {
    // console.log(err);
    FS.saveFile(record, function(err, filename) {
      // console.log(' - - - ARCHIVED : '+filename);
    });
    // now the actual update part
    return REQUEST(options, callback).end();
  });
}
