var OPTIONS = require('./options');
var REQUEST = require('./http_request');

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
