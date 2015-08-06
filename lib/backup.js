var CREATE = require('./create');
var READ   = require('./read');

/**
 * backup saves versions of records before an UPDATE or DELETE is executed
 * @param {Object} res - the record we want to be backed up
 * @param {Function} callback - the function to be called after backup complete
 */
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
