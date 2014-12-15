var http = require('http');
var config = require('../config');

function create(record, callback) {

  var index = record.index || 'index';
  var type  = record.type  || 'type';
  var id    = record.id    || Math.floor(Math.random() * (1000000));
  delete record.index; // avoid bloating es with
  delete record.type;  // useless data
  delete record.id;

  // Build the post string from an object
  var json = JSON.stringify(record);

  // An object of options to indicate where to post to
  var post_options = {
    host: config.host,
    port: config.port,
    path: '/' + index + '/' + type + '/' + id,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(json)
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

  // post the data
  req.write(json);
  req.end();

}

module.exports = {
  create : create
}
// curl -XPOST 'http://localhost:9200/twitter/tweet/1' -d '{"message" : "hello world"}'
// curl -GET http://localhost:9200/twitter/tweet/1?pretty
