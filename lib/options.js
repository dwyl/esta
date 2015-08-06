var url = require('url'); // https://nodejs.org/api/url.html

module.exports = function options(record, method) {
  record.index = record.index || process.env.ES_INDEX || 'index';
  record.type  = record.type  || 'type';
  // if the person does not set the record.id we give it a pseudo-random-number:
  record.id    = record.id    || Math.floor(Math.random() * (1000000000))+new Date().getTime();

  var o = {
    host: '127.0.0.1',
    port: 9200,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // example url: https://un:pw@dogwood-1234.eu-west-1.searchly.com
  if(process.env.SEARCHBOX_SSL_URL || process.env.BONSAI_URL) {
    var u = url.parse(process.env.SEARCHBOX_SSL_URL || process.env.BONSAI_URL);
    var unpw = u.auth.split(':');
    var un   = unpw[0];
    var pw   = unpw[1];
    var auth = (new Buffer(un + ':' + pw, 'utf8')).toString('base64');
    o.headers['Authorization'] = 'Basic ' + auth;
    o.host   = u.host;
    o.port   = 443;
  }
  return o;
}
