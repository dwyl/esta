var KEYWORDS = "exited, amazing"; // add keywords separated by spaces.
// KEYWORDS = "katie, justin, kim, beyonce, 1DWorld, OMG, FML, news, breaking"; // LOTS of tweets!
var POST_COUNT = 100;

var twitter = require('twitter');
var tw = new twitter({
  consumer_key: 'U8N2QzFu6Hv4BB3BjObIy9HDF',
  consumer_secret: 'rJWtj5NneVWmfT8STB7YN6IBkLreke9JoJhP3nIe0ffnBq91Xv',
  access_token_key: '2389016353-4tCDaVgRFkkNsWOj1sb6fZQ8s0bINqD5jJGmqRC',
  access_token_secret: 'OEFnemh9FlSkOX5YuNP46XsDh3EutbHiiKq6q8wV2Pwko'
});

var FS = require('../lib/fs');

tw.stream("statuses/filter", {
  track: KEYWORDS, 'lang':'en'
}, function(stream) {
  stream.on('data', function(data) {
    if(data.lang === 'en') {
      console.log(data);
      data.type = 'tweet';
      data.index = 'twitter';
      FS.saveFile(data, function(err) {
        if(err){
          console.log(err);
        }
      });
    }
  }); // end .on('data') listener
});
