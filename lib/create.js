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
  delete record.id;

  // Build the post string from an object
  var json = JSON.stringify(record);
  var req = REQUEST(options, callback);
  // post the data
  req.write(json);
  req.end();

}
