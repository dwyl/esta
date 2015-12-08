// LIST operation needs to be done after "performance" to ensure we have some records!
var test = require('tape');
var chalk = require('chalk');
var fs = require('fs');
var LIST = require('../lib/list');

test(chalk.cyan("LIST all _ids of records in index"), function(t) {
    var query = {
      type: 'tweet',
      index: 'twitter'
    }
    LIST(query, function(res){
      console.log(' - - - - - - - - - - - - - - - - - - - - - res:');
      // console.log(JSON.stringify(res, null, 2));
      console.log(res.hits.hits.length)
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
      t.ok(res.hits.hits.length > 9, "List returned "+res.hits.hits.length + " hits.")
      t.end();
    });
});
