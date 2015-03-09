var http = require('http');
var REQUEST = require('./http_request');
var OPTIONS = require('./options');

module.exports = function checkConnection(callback) {
  var record = { // overwrite this below
    type:  'all',
    index: 'any',
    id: 1
  };
  var options = OPTIONS(record, 'GET');
  options.path = '/';
  var req = REQUEST(options, callback);
  req.write(JSON.stringify(record));  // post the data
  return req.end();
}
