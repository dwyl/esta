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
      var response = JSON.parse(resStr);
      if(options.method === "DELETE" && response.found === true) {
        response.deleted = true;
      } else {
        // do nothing ... istanbul!
      }
      callback(response); // return response as object
    }); // Yes, we allow errors to explode on the stack!
  })    // got a better idea? submit an issue! (lets do it!)
  return req;
}
