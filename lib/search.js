var OPTIONS = require('./options');
var REQUEST = require('./http_request');

// curl 127.0.0.1:9200/_all/tweet/_search?q=text:amazing
module.exports = function search(query, callback) {

  query.index = query.index || '_all';
  query.type  = query.type  || 'type';
  query.text  = query.text  || 'hello';
  query.field = query.field || 'text';
  // An object of options to indicate where to post to
  var options = OPTIONS(query, 'POST');
  var str = encodeURIComponent(query.text);
  options.path = '/' + query.index + '/' + query.type
    +'/_search?q=' +query.field + ':' + str;

  return REQUEST(options, callback).end();
}
