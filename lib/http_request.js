var http = require('http');

module.exports = function request(options, callback) {
  var resStr = '';
  // Set up the request
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      callback(null, JSON.parse(resStr));
    });
  })
  return req;
}
