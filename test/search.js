var test = require('tape');
var chalk = require('chalk');

var loadFixtures = require('./search_setup.js');
var ES = require('../lib/index');
var SEARCH = require('../lib/search');

test(chalk.cyan('Query ES for string: "amazing"'), function (t) {
  loadFixtures( function() {
    // console.log(chalk.black.bgGreen.bold(' Fixtures Loaded. Lets Search! '));
    // twitter_tweet_559464234510471200
    var record = {
      type: 'tweet',
      index: 'twitter',
      id: 559464234510471200
    }

    ES.READ(record, function(rec){
      // console.log(rec);
      console.log(rec._source.text);
      t.equal(rec._source.text.indexOf('amazing') > 0, true, chalk.green.bold("✓ Record is amazing!"));
      t.end();
    });
  });
});

// search for a term we *know* has results: "amazing"
test(chalk.cyan('Query ES for string: "amazing"'), function (t) {
  // setup query:
  var query = {
    type:  'tweet',
    index: 'twitter',
    field: 'text',
    text:  'amazing'
  };
  setTimeout(function(){
    SEARCH(query, function(res) {
      // console.log(res);
      t.equal(res.hits.total > 0, true,
        chalk.green("✓ Search results found: "+ res.hits.total));
      t.end();
    });
  },1200)
});

test(chalk.cyan('Query ES for string that is NOT in the index'), function (t) {
  // setup query:
  var query = {
    type:  'tweet',
    index: 'twitter',
    field: 'text',
    text:  'asdfg'
  };

  SEARCH(query, function(res) {
    console.log(res);
    t.equal(res.hits.total === 0, true,
      chalk.green("✓ ZERO Search results found: "+ res.hits.total + " (as expected)"));
    t.end();
  });
});


test(chalk.cyan('Search without supplying any params'), function (t) {
  // setup query:
  var query = {}; // this will look for the string "hello" (default)

  SEARCH(query, function(res) {
    console.log(res);
    t.equal(res.hits.total === 0, true,
      chalk.green("✓ Found: "+ res.hits.total));
    t.end();
  });
});

test(chalk.cyan('Simulate actual usage: search for "Thanks"'), function (t) {
  SEARCH({"text":"thanks"}, function(res) {
    t.equal(res.hits.total > 0, true,
      chalk.green("✓ Search results found: "+ res.hits.total ));
    t.end();
  });
});

test(chalk.cyan('Simulate actual usage: search for "Thanks"'), function (t) {
  SEARCH({"text":"thanks"}, function(res) {
    t.equal(res.hits.total > 0, true,
      chalk.green("✓ Search results found: "+ res.hits.total ));
    t.end();
  });
});
