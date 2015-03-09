var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function create(record, callback) {

  record.index = record.index || 'index';
  record.type  = record.type  || 'type';
  record.id    = record.id    || Math.floor(Math.random() * (1000000));
  // An object of options to indicate where to post to
  var options = OPTIONS(record, 'POST');

  delete record.index; // avoid bloating es with
  delete record.type;  // useless meta-data
  delete record.id;    // this is still stored just not dupe

  var req = REQUEST(options, callback);
  // post the data
  req.write(JSON.stringify(record));
  return req.end();

}
