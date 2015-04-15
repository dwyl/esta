var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function create(record, callback) {
  // fallbacks for type and id ... do we need these?
  // see discussion on:
  record.type  = record.type  || 'type';
  // if the person does not set the record.id we give it a pseudo-random-number:
  record.id    = record.id    || Math.floor(Math.random() * (1000000000))+new Date().getTime();
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
