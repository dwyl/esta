var http = require('http');

function checkConnection(callback) {
  var options = {
    hostname: 'localhost',
    port: 9200,
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function() {
      // console.log('END');
      callback(null, JSON.parse(resStr));
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    callback(e);
  });

  req.end();
}

checkConnection(function(e,res){
  console.log(res);
})
