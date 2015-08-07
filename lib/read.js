var OPTIONS = require('./options');
var REQUEST = require('./http_request');
/**
 * reads the record using options to setup the http request options
 * @param {Object} record - the record we want to retrieve
 * required fields for a successful read query are index, type & id
 * @param {Function} callback - gets called with the result as its only arg
 */
module.exports = function read(record, callback) {
  var options = OPTIONS(record, 'GET');
  return REQUEST(options, callback);
}
