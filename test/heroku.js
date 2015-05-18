var test  = require('tape');
var chalk = require('chalk');
var uncache = require('./uncache').uncache;

test(chalk.cyan('Force HTTP Error with bad UN:PW'), function (t) {
  // please don't spam this SearchBox ElasticSearch account with Records!
  // Its JUST for Testing this module! thanks! :-)
  process.env.SEARCHBOX_SSL_URL = 'https://un:pw@kili-eu-west-1.searchly.com'
  var ES_URL = process.env.SEARCHBOX_SSL_URL || '127.0.0.1:9200';
  // https://nodejs.org/docs/latest/api/globals.html#globals_require_cache
  uncache('../lib/index'); // reload http_request sans SSL! (localhost)
  var ES = require('../lib/index');
  ES.CONNECT(function (res) {
    console.log(res);
    t.equal(res.status, 'error', chalk.green("✓ Error forced. (we wanted this!)"));
    t.end();
  });
});

test(chalk.cyan('Exercise http_request req.on("error") handler'), function (t) {
  var options = {
    host: '127.0.0.1',
    port: '81',
    path: '/',
    method: 'SET'
  }
  // https://nodejs.org/docs/latest/api/globals.html#globals_require_cache
  uncache('../lib/http_request'); // reload http_request sans SSL! (localhost)
  var REQUEST = require('../lib/http_request');
  var ES = require('../lib/index');
  REQUEST(options, function (res) {
    // console.log(res.code);
    t.equal(res.code, 'ECONNREFUSED', chalk.green("✓ 'HEROKU' Error forced. (we wanted this!)"));
    t.end();
  });
});


test(chalk.cyan('CONNECT to Bonsai on HEROKU!'), function (t) {
  // please don't spam this Bonsai ElasticSearch account with Records!
  // Its JUST for Testing this module! thanks! :-)
  delete process.env.SEARCHBOX_SSL_URL; // unset SearchBox so we can test Bonsai
  process.env.BONSAI_URL = 'https://8py6wr37:ehq7m0yasuz446rd@ginkgo-5930963.eu-west-1.bonsai.io'
  // https://nodejs.org/docs/latest/api/globals.html#globals_require_cache
  uncache('../lib/index'); // reload http_request sans SSL! (localhost)
  var ES = require('../lib/index');
  // don't specify the index
  ES.CONNECT(function (res) {
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - HEROKU Bonsai works like a charm"));
    t.end();
  });
});

test(chalk.cyan('CREATE a record on HEROKU/Bonsai'), function (t) {
  process.env.BONSAI_URL = 'https://8py6wr37:ehq7m0yasuz446rd@ginkgo-5930963.eu-west-1.bonsai.io'
  var ES = require('../lib/index');
  var record = require('./fake_record.js')(); // fake record
  ES.CREATE(record, function (res) {
    console.log(res)
    t.equal(res.created, true, chalk.green("✓ Record Created on Heroku/Bonsai"));
    t.end();
  });
});

// var searchbox_index = 'bonsai'+new Date().getTime();
test(chalk.cyan('CONNECT to SearchBox on HEROKU!'), function (t) {
  // please don't spam this SearchBox ElasticSearch account with Records!
  // Its JUST for Testing this module! thanks! :-)
  delete process.env.BONSAI_URL; // so we can test SearchBox now
  process.env.SEARCHBOX_SSL_URL = 'https://paas:177117314d80d98671aaffd7fb9a314b@kili-eu-west-1.searchly.com'
  // https://nodejs.org/docs/latest/api/globals.html#globals_require_cache
  uncache('../lib/index'); // reload http_request sans SSL! (localhost)
  var ES = require('../lib/index');
  ES.CONNECT('twitter', function (res) {
    console.log(res);
    t.equal(res.status, 200, chalk.green("✓ Status 200 - OK"));
    t.end();
  });
});

test(chalk.cyan('CREATE a record on HEROKU/SearchBox'), function (t) {
  process.env.SEARCHBOX_SSL_URL = 'https://paas:177117314d80d98671aaffd7fb9a314b@kili-eu-west-1.searchly.com'
  var ES = require('../lib/index');
  var record = require('./fake_record.js')(); // fake record
  ES.CREATE(record, function (res) {
    console.log(res)
    t.equal(res.created, true, chalk.green("✓ Record Created "+res._id));
    t.end();
  });
});

test(chalk.cyan('Ensure that we clear node require cache to resume testing on localhost'), function(t){
  uncache('../lib/index');
  delete process.env.SEARCHBOX_SSL_URL; // unset SearchBox URL so we can resume testing locally
  delete process.env.BONSAI_URL; // same for BONSAI
  t.equal(process.env.BONSAI_URL, undefined, chalk.green("✓ Continue testing Local ES."));
  t.end();
});
