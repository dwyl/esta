var http = require('http');
var OPTIONS = require('./options');

module.exports = function checkConnection(callback) {
  // just allows us to keep things a bit drier
  var record = { // overwrite this below
    type:  'all',
    index: 'any',
    id: 1
  };
  var options = OPTIONS(record, 'GET');
  options.path = '/';
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
