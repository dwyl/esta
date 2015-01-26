var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var FS = require('./fs');

// DO NOT EXPOSE THIS METHOD IN PUBLIC API!!
module.exports = function dropindex(record, callback) {
  var options = OPTIONS(record, 'DELETE');
  options.path = "/_all"; // DELETEs EVERYTHING!!
  return REQUEST(options, callback).end();
}
