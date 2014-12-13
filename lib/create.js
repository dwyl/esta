var querystring = require('querystring'); // to build our post string
var http = require('http');
var config = require('../config');

// function insert(id,tweet) {
  // Build the post string from an object
var data = querystring.stringify({
  "message" :"hello world"
});

// An object of options to indicate where to post to
var post_options = {
  host: 'localhost',
  port: '9200',
  path: '/twitter/tweet/1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};
console.log(' - - - - ');
console.log(post_options);
console.log(' - - - - ');
console.log(data);
console.log(' - - - - ');
//
var resStr = '';
// Set up the request
var req = http.request(post_options, function(res) {
  res.setEncoding('utf8');
  var resStr = '';
  res.on('data', function (chunk) {
    resStr += chunk;
  }).on('end', function () {
    console.log(JSON.parse(resStr));
  });
});

// post the data
req.write(data);
req.end();

// curl -XPOST 'http://localhost:9200/twitter/tweet/1' -d '{"message" : "hello world"}'
// curl -GET http://localhost:9200/twitter/tweet/1?pretty
