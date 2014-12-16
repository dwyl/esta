var http = require('http');
var config = require('../config');

function read(record, callback) {

  // Build the post string from an object
  var json = JSON.stringify(record);

  // An object of options to indicate where to post to
  var options = {
    host: config.host,
    port: config.port,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: 'GET'
  };

  var resStr = '';
  // Set up the request
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      // console.log(JSON.parse(resStr));

      callback(null, JSON.parse(resStr));
    });
  });

  // post the data
  req.write(json);
  req.end();

}

module.exports = {
  read : read
}
// curl -XPOST 'http://localhost:9200/twitter/tweet/1' -d '{"message" : "hello world"}'
// curl -GET http://localhost:9200/twitter/tweet/1?pretty
