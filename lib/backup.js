var CREATE = require('./create');
var READ   = require('./read');

function backup(res, callback) {

  // we want to take a SNAPSHOT of the record BEFORE it gets updated/deleted
  // READ(record, function(res){
  //   if(res.found) { // record already existed
      var record = {};
      for(var key in res._source) { // get contents of recort as it CURRENTLY is
        record[key]  = res._source[key];
      }
      record.index = res._index
      record.type  = res._type + "_bak" // http://en.wikipedia.org/wiki/Bak_file
      record.id    = res._id +'_' + res._version;
      console.log(" - - CREATE BACKUP Record - - ")
      console.log(record);
      console.log(" - - - - - - - - - - - - - - - ")
    // }
    // else {
    //   // istanbul
    //
    // }
    // console.log(' >> attempt to create: '+ record.type + "/" +record.id);
    return CREATE(record, callback);
  // });

}

module.exports = backup;
