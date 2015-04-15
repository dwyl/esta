module.exports = function options(record, method) {
  // record.index = record.index || process.env.ES_INDEX || 'index';
  var o = {
    host: '127.0.0.1',
    port: 9200,
    path: '/' + record.index + '/' + record.type + '/' + record.id,
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if(process.env.SEARCHBOX_SSL_URL) {
    var url = process.env.SEARCHBOX_SSL_URL;
    // e.g: "https://un:pw@dogwood-1234.eu-west-1.searchly.com"
    var unpw = url.split('://')[1].split(':');
    var un = unpw[0];
    var pw = unpw[1].split('@')[0];
    console.log(un +':'+pw);
    var auth = (new Buffer(un + ':' + pw, 'utf8')).toString('base64');
    o.headers['Authorization'] = 'Basic ' + auth;
    o.host = url.split('@')[1];
    o.port = 443;
  }
  // console.log(' - - - - - - - - - - - - - -  options:')
  // console.log(o);
  // console.log(' - - - - - - - - - - - - - - - - - - -')
  return o;
}
