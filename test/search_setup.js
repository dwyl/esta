var KEYWORDS = "science, math, maths, physics, chemistry"; // add keywords separated by spaces.
// KEYWORDS = "katie, justin, kim, beyonce, 1DWorld, OMG, FML, news, breaking"; // LOTS of tweets!
var POST_COUNT = 10000;

var twitter = require('twitter');
var tw = new twitter({
  consumer_key: 'U8N2QzFu6Hv4BB3BjObIy9HDF',
  consumer_secret: 'rJWtj5NneVWmfT8STB7YN6IBkLreke9JoJhP3nIe0ffnBq91Xv',
  access_token_key: '2389016353-4tCDaVgRFkkNsWOj1sb6fZQ8s0bINqD5jJGmqRC',
  access_token_secret: 'OEFnemh9FlSkOX5YuNP46XsDh3EutbHiiKq6q8wV2Pwko'
});
