var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function del(record, callback) {
  var options = OPTIONS(record, 'DELETE');
  return REQUEST(options, callback).end();
}
