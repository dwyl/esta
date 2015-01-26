var http = require('http');
var config = require('../config');

function checkConnection(callback) {
  var options = {
    hostname: config.host,
    port: config.port,
    method: 'GET'
  };
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      callback(null, JSON.parse(resStr));
    });
  })
  req.end();
}

module.exports = {
  checkConnection : checkConnection
}
