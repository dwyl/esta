var OPTIONS = require('./options');
var REQUEST = require('./http_request');

/**
 * list constructs a search query to list ALL the ids in the index!
 * @param {Object} query - the query we want to look for
 * required fields text (the text you want to search for)
 * and field (the fields in which we want to search)
 * try using curl: curl 127.0.0.1:9200/_all/tweet/_search?q=text:amazing
 */
module.exports = function list(query, callback) {
  query.index = query.index || '_all';
  query.type  = query.type  || 'tweet';
  query.text  = query.text  || 'hello';
  query.field = query.field || 'text';
  // An object of options to indicate where to post to
  var options = OPTIONS(query, 'GET');
  options.body = {
    "query" : {
        "match_all" : {}
    },
    "fields": ["_id"]
  }
  var str = encodeURIComponent(query.text);
  options.path = '/' + query.index + '/' + query.type
    +'/_search?scrollq=1m&pretty'; // see:
  return REQUEST(options, callback);
}
