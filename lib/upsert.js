var http = require('http');
var config = require('../config');
var R = require('../read.js');
var OPTIONS = require('./options');


function upsert(record, callback) {

  // check if the record already exists
  R.read(record)

  var options = OPTIONS(record, 'PUT');

  var resStr = '';
  // Set up the request
  var req = http.request(post_options, function(res) {
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      // console.log(JSON.parse(resStr));
      callback(null, JSON.parse(resStr));
    });
  });

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
