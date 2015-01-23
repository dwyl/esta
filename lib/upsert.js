var READ = require('./read.js');
var UPDATE = require('./update.js');
var CREATE = require('./create.js')
var OPTIONS = require('./options');
var REQUEST = require('./http_request');

module.exports = function upsert(record, callback) {
  // check if the record already exists
  READ(record, function(rec) {
    // console.log(rec);
    // IF the record alreay exists
    if(rec.found) { // UPDATE it
      UPDATE(record, callback);
    } else {        // ELSE CREATE it
      CREATE(record, callback);
    }
  });
}
