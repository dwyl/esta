var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ = require('./read');
var BACKUP  = require('./backup');

module.exports = function update(record, callback) {
  var options = OPTIONS(record, 'POST');
  // asynchronously fetch the record so we can save a copy before updating
  READ(record, function(res) {
    options.body = record; // pass data to be posted
    if(res.found) {
      var rev = false;
      // only save a backup version if existing fields have been updated

      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - updated:')
      console.log(record)
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - existing:')
      console.log(res._source)
      // first get all the keys which were on the originale record:
      var originalkeys = Object.keys(res._source);
      var updatedkeys  = Object.keys(record);      // and the current record
      console.log(originalkeys);
      // check if the key/values have been updated or deleted:
      originalkeys.map(function(k){
        // if the existing version
        if(res._source[k] !== record[k]){
          rev = true; // its a new version if any of the key/values change
          console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - REVISION:')
          console.log("res._source[k] !== record[k] >> KEY:" +k + "  >> "+  res._source[k] +" !== " +record[k])
        }
      })
      if(rev) {
        BACKUP(res, function(response) {
          return REQUEST(options, callback);
        });
      }
      else {
        return REQUEST(options, callback);
      }
      // check if the old version has a key which has been deleted in the update
      // updatedkeys.map(function(k){
      //   if(record[k] !== )
      // })

      console.log(' - - - - - - - - - -')
      // else simply set the empty fields of the record and save


    }
    else {
      return REQUEST(options, callback);
    }
  });
}
