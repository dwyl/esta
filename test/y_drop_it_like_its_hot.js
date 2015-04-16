var OPTIONS = require('../lib/options');
var REQUEST = require('../lib/http_request');

// DO NOT EXPOSE THIS METHOD IN ANY PUBLIC API!!!
module.exports = function(record, callback) { //!
  var options = OPTIONS(record, 'DELETE');    //!
  options.path = "/_all"; // DELETEs EVERYTHING!!
  return REQUEST(options, callback).end();    //!
} // *ONLY* USE THIS IN YOUR *TESTS*! SERIOUSLY!!
