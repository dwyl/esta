var config = require('../config');

module.exports = function options(record, method) {
  return {
    host: config.host,
    port: config.port,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: method
  };
}
