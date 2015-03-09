var CREATE = require('./create');
var READ   = require('./read');

module.exports = function backup(res, callback) {
  // we want to take a SNAPSHOT of the record BEFORE it gets updated/deleted
  var record = {};
  for(var key in res._source) { // get contents of recort as it CURRENTLY is
    record[key]  = res._source[key];
  }
  record.index = res._index
  record.type  = res._type + "_bak" // http://en.wikipedia.org/wiki/Bak_file
  record.id    = res._id +'_' + res._version;

  return CREATE(record, callback);
}
