var OPTIONS = require('./options');
var REQUEST = require('./http_request');

/**
 * search constructs a search query
 * @param {Object} query - the query we want to look for
 * required fields text (the text you want to search for)
 * and field (the fields in which we want to search)
 * try using curl: curl 127.0.0.1:9200/_all/tweet/_search?q=text:amazing
 */
module.exports = function search(query, callback) {
    query.index = query.index || '_all';
    query.type = query.type || 'tweet';
    query.text = query.text || 'hello';
    query.field = query.field || 'text';
    query.size = query.size || '5';
    query.from = query.from || '0';
    // An object of options to indicate where to post to
    var options = OPTIONS(query, 'GET');
    var str = encodeURIComponent(query.text);
    options.path = '/' + query.index + '/' + query.type +
        '/_search?size=' + query.size + '&from=' + query.from + '&q=' + query.field + ':' + str;
    return REQUEST(options, callback);
}
