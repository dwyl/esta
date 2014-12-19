var http = require('http');
var config = require('../config');
var R = require('../read.js');



function upsert(record, callback) {

  // check if the record already exists
  R.read(record)


  // An object of options to indicate where to post to
  var post_options = {
    host: config.host,
    port: config.port,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  };

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
