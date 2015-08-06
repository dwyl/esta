var test     = require('tape');
var REQUEST  = require('../lib/http_request');
var OPTIONS  = require('../lib/options')
var optsmsg  = "requires valid http request options";
var cberrmsg = "please supply a callback"

test('Attepmt to invoke REQUEST WITHOUT http request options (ERROR CHECK)', function(t) {
  try {
    var result  = REQUEST(); // no options or callback! :-O
  } catch (error){
    console.log(error);
    t.ok(error.indexOf(optsmsg) > -1, "*Wanted Error* Got "+error + " (as expected!)");
    t.end();
  }
})

test('Attepmt to invoke REQUEST WITHOUT VALID callback funciton (ERROR CHECK)', function(t) {
  try {
    var options = OPTIONS({}, 'GET');
    var result  = REQUEST(options);
  } catch (error){
    console.log(error);
    t.ok(error.indexOf(cberrmsg) > -1, "*Wanted Error* Got "+error + " (as expected!)");
    t.end();
  }
})
