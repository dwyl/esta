var OPTIONS = require('./options');
var REQUEST = require('./http_request');
var READ    = require('./read');
var FS      = require('./fs');

module.exports = function del(record, callback) {
  var options = OPTIONS(record, 'DELETE');

  READ(record, function(res) {
    // console.log(res);
    res.index = res._index;
    res.type  = res._type;
    res.id    = res._id;
    FS.saveFile(res, function(err, filename) {
      console.log(' - - - ARCHIVED : '+filename);
    });
    // now the actual update part
    return REQUEST(options, callback).end();
  });
}
