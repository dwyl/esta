var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var record = require('../test/fake_record.js')(); // fake record (just to get the options object)
module.exports = function stats(callback) {
  var options = OPTIONS(record, 'GET');
  options.path = '/_stats';
  return REQUEST(options, callback);
}
