var http = require('http');
var REQUEST = require('./http_request');
var OPTIONS = require('./options');

module.exports = function checkIndex(index, callback) {
  if(!callback || typeof index === 'function') { // backward compatability :-)
    callback = index;
    index = process.env.ES_INDEX || 'index';
  }
  else {
    index = index;
  }
  var record = {      // for simplicity we only have one OPTIONS method
    type:  'all',     // which requires a 'record' to be passed in
    index: index,     // it does not have to be a "real" record.
    id: 1             // we just want the http.request options object.
  };
  var options = OPTIONS(record, 'GET');
  options.path = '/'+ index;
  // first we check if the index already exists
  var req = REQUEST(options, function(res) {
    if(res.error) { // if there is an error we know the index does not exist
      console.log(res);
      options.method = 'PUT'; // see: https://github.com/nelsonic/esta/issues/75
      REQUEST(options, function(res2) { // so we create it with a PUT request
        options.method = 'GET'          // finally we ask for instance info
        options.path = '/';             // this is at the ES root url
        return REQUEST(options, callback); // return db/cluster details
      });
    } else { // no error when checking if the index exists (means its there!)
      options.method = 'GET';
      options.path = '/';
      return REQUEST(options, callback); // return db/cluster details
    }
  });
}
