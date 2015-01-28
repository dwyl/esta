var FS      = require('./fs'); // NOT the node core module!
var OPTIONS = require('./options');
var READ    = require('./read');
var REQUEST = require('./http_request');

module.exports = function del(record, callback) {
  var options = OPTIONS(record, 'DELETE');

  READ(record, function(res) {
    // console.log(res);
    res.index = res._index;
    res.type  = res._type;
    res.id    = res._id;
    FS.saveFile(res, function(err, filename) {
      // console.log(' - - - ARCHIVED : '+filename);
    });
    // now return the request object with DELETE operation:
    return REQUEST(options, callback).end();
  });
}
