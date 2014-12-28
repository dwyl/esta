var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function update(record, callback) {
  var options = OPTIONS(record, 'PUT');
  var req = REQUEST(options, callback);
  req.write(JSON.stringify(record));
  req.end();
}
