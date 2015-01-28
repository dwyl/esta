var OPTIONS = require('./options');
var REQUEST = require('./http_request');

// DO NOT EXPOSE THIS METHOD IN PUBLIC API!!
module.exports = function(record, callback) {
  var options = OPTIONS(record, 'DELETE');
  options.path = "/_all"; // DELETEs EVERYTHING!!
  return REQUEST(options, callback).end();
}
