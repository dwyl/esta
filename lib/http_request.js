if(process.env.SEARCHBOX_SSL_URL || process.env.BONSAI_URL){
  var http = require('https');
}
else {
  var http = require('http');
}

module.exports = function request(options, callback) {
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
