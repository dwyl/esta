var http = require('http');
var config = require('../config');

function del(record, callback) {

  var options = {
    host: config.host,
    port: config.port,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: 'DELETE'
  };

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
  }).end();

}

module.exports = {
  del : del
}
