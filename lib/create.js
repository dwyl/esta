var OPTIONS = require('./options');
var REQUEST = require('./http_request');
/**
 * create saves your record to ElasticSearch
 * @param {Object} record - the record we want to create
 * optional (but recommended) fields query are index, type & id
 * @param {Function} callback - gets called with the result as its only arg
 */
module.exports = function create(record, callback) {
  var options = OPTIONS(record, 'POST'); // options for http.request
  var rec = {}; // don't mutate the original record object
  for(var key in record) {  // exact copy of the record object
    rec[key] = record[key];
  }
  delete rec.index; // avoid bloating es records
  delete rec.type;  // with useless meta-data
  delete rec.id;    // this is still stored just not dupe

  options.body = rec; // pass the data to be posted
  return REQUEST(options, callback);
}
