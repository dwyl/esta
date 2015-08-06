var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var record = require('../test/fake_record.js')(); // fake record (just to get the options object)
/**
 * stats is a simple call to ElasticSearch's /_stats endpoint
 * @param {Function} callback - the callback to call with the stats result.
 */
module.exports = function stats(callback) {
  var options = OPTIONS(record, 'GET');
  options.path = '/_stats';
  return REQUEST(options, callback);
}
