if(process.env.SEARCHBOX_SSL_URL || process.env.BONSAI_URL){
  var http = require('https'); // ALWAYS TLS over the internets!
}
else {
  var http = require('http'); // no SSL on localhost
}

/**
 * request is a bare-bones http request using node.js core http module
 * see: https://nodejs.org/api/http.html#http_http_request_options_callback
 */
module.exports = function request(options, callback) {
  // check http request options are set https://github.com/dwyl/esta/issues/79
  if(!options || !options.host || !options.port || !options.path){
    var msg = "ESTA requires valid http request options. please use lib/options"
    throw "ERROR: " + __filename + ":16 \n" + msg;
  }
    // check for existence of a callback function
  if(!callback || typeof callback !== 'function') {
    var cmsg = "ESTA is Asynchronous, please supply a callback as second param!"
    throw "ERROR: " + __filename + ":21 \n" + cmsg;
  }
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
        var response = JSON.parse(resStr);
        if(options.method === "DELETE" && response.found === true) {
          response.deleted = true;
        }
        return callback(response); // return response as object
    });
  })
  // if you have a better suggestion for error handling please submit an issue!
  req.on('error', function(e) {
    console.log('>> Problem with http request: ' + e.message);
    return callback(e);
  });
  // write to request body if passed to options
  if (options.body) {
    req.write(JSON.stringify(options.body));
  }
  req.end();
}
