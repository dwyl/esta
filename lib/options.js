// var config = require('../default_config');

module.exports = function options(record, method) {
  return {
    host: process.env.ES_HOST,
    port: process.env.ES_PORT,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
}
