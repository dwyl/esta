var test  = require('tape');
var chalk = require('chalk');
var record = require('./fake_record.js')(); // fake record
var uncache = require('./uncache').uncache; // so we can re-load lib/options.js
var CREATE = require('../lib/create.js');
var ES_INDEX = process.env.ES_INDEX; // save the env var for later

test(chalk.cyan('CREATE a record'), function (t) {
  CREATE(record, function (res) {
    console.log(res)
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.end();
  });
});

test(chalk.cyan('CREATE a record without specifying index, type or id (fallback)'), function (t) {
  delete record.index;
  delete record.type;
  delete record.id;
  delete process.env.ES_INDEX;

  uncache('../lib/options');
  uncache('../lib/create.js');
  uncache('../lib/http_request');
  var CREATE = require('../lib/create.js'); // re-require it

  CREATE(record, function (res) {
    console.log(res);
    t.equal(res.created, true, chalk.green("✓ Record Created"));
    t.equal(res._index, 'index', chalk.green("✓ Fallback index is: "+res._index));
    t.equal(res._type, 'type', chalk.green("✓ Fallback type is: "+res._type));

    t.end();
  });
});

test(chalk.cyan('CREATE a record with process.env.ES_INDEX'), function (t) {
  var record = require('./fake_record.js')();
  delete record.index;
  process.env.ES_INDEX = ES_INDEX;

  uncache('../lib/options');
  uncache('../lib/create.js');
  uncache('../lib/http_request');
  var CREATE = require('../lib/create.js'); // re-require it

  CREATE(record, function (res) {
    console.log(res);
    t.equal(res.created, true, chalk.green("✓ Record Created using ES_INDEX"));
    t.equal(res._index, process.env.ES_INDEX, chalk.green("✓ index: "+process.env.ES_INDEX));
    delete process.env.ES_INDEX;
    t.end();
  });
});
