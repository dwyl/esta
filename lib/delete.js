var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var FS = require('./fs');

module.exports = function del(record, callback) {
  var options = OPTIONS(record, 'DELETE');
  FS.saveFile(record, function(err, filename) {
    console.log('record : '+filename);
  });
  return REQUEST(options, callback).end();
}
