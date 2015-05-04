var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function read(record, callback) {
  var options = OPTIONS(record, 'GET');
  return REQUEST(options, callback);
}
