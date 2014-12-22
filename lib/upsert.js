// var http = require('http');
// var config = require('../config');
var R = require('../read.js');
var OPTIONS = require('./options');
var REQUEST = require('./http_request');

function upsert(record, callback) {

  // check if the record already exists
  R.read(record)

  var options = OPTIONS(record, 'PUT');
  var req = REQUEST(options, callback);

  // Build the post string from an object
  delete record.index; // avoid bloating es
  delete record.type;  // with dupe data
  delete record.id;    // delete before insert
  var json = JSON.stringify(record);
  // post the data
  req.write(json);
  req.end();

}

// module.exports = {
//   update : update
// }
