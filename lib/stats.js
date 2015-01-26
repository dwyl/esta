var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function stats(callback) {
  // fake record
  var record = {
    type:  0,
    index: 0,
    id:    0,
  }
  var options = OPTIONS(record, 'GET');
  options.path = '/_stats';
  return REQUEST(options, callback).end();
}
