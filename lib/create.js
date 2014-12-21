var config = require('../config');
var REQUEST = require('./http_request');

function create(record, callback) {

  var index = record.index || 'index';
  var type  = record.type  || 'type';
  var id    = record.id    || Math.floor(Math.random() * (1000000));
  delete record.index; // avoid bloating es with
  delete record.type;  // useless meta-data
  delete record.id;

  // Build the post string from an object
  var json = JSON.stringify(record);

  // An object of options to indicate where to post to
  var options = {
    host: config.host,
    port: config.port,
    path: '/' + index + '/' + type + '/' + id,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var req = REQUEST(options, callback);
  // post the data
  req.write(json);
  req.end();

}

module.exports = {
  create : create
}
