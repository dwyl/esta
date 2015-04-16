var http = require('http');
var REQUEST = require('./http_request');
var OPTIONS = require('./options');

module.exports = function checkIndex(callback) {
  var record = { // overwrite this below
    type:  'all',
    index: 'any',
    id: 1
  };
  var options = OPTIONS(record, 'GET');
  var index = process.env.ES_INDEX || 'index';
  options.path = '/'+ index;
  var req = REQUEST(options, function(res){
    // console.log(res);
    if(res.error){
      options.method = 'PUT'
      REQUEST(options, function(res2){
        // console.log(res2);
        options.method = 'GET'
        options.path = '/';
        return REQUEST(options, callback).end();
      }).end();
    } else {
      options.method = 'GET'
      options.path = '/';
      return REQUEST(options, callback).end();
    }
  }).end();
}
