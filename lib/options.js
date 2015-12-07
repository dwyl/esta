var url = require('url'); // https://nodejs.org/api/url.html

/**
 * options method sets up the request options for issuing the REST requests
 * specifically we set our host option for the ElasticSearch instance/cluster
 * and the record details which are used in the path
 * @param {Object} record is the record we want to CRUD from ElasticSearch
 * @param {String} method is the HTTP Method we are issuing e.g GET/POST/DELETE
 * @returns {Object} the options we will use for our http request
 */
module.exports = function options(record, method) {
  record.index = record.index || process.env.ES_INDEX || 'index';
  record.type  = record.type  || 'type';
  // if the person does not set the record.id we give it a pseudo-random-number:
  record.id    = record.id    || Math.floor(Math.random() * (1000000000))+new Date().getTime();

  var o = {
    host: '127.0.0.1', // gets over-written below if using HEROKU
    port: 9200,        // also over-written below if using HEROKU
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: method,   // e.g. GET, POST, DELETE for our CRUD
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // example url: https://myuser:password@dogwood-1234.eu-west-1.searchly.com
  if(process.env.SEARCHBOX_SSL_URL) { // || process.env.BONSAI_URL) {
    var u = url.parse(process.env.SEARCHBOX_SSL_URL); // || process.env.BONSAI_URL);
    var unpw     = u.auth.split(':'); // auth is everything between // and @
    var username = unpw[0];
    var password = unpw[1];
    var auth = (new Buffer(username + ':' + password, 'utf8')).toString('base64');
    o.headers['Authorization'] = 'Basic ' + auth;
    o.host   = u.host; // everthing after the @ symbol
    o.port   = 443;    // always TLS/SSL
  }
  return o; // the full object to be used in the http request
}
