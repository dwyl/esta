var path = require('path');
var http = require('http');
var https = require('https');
var qs = require('qs');
// var http_logger = require('./http_logger');

function append_params(path, params) {
  path = path || '';

  if (params && Object.keys(params).length > 0) {
    if (!path.match(/\?/)) {
      path += "?";
    } else {
      path += "&";
    }
    path += qs.stringify(params);
  }
  return path;
}

var http_client = function (args) {
  var self = {};
  args = args || {};
  self.host = args.host || 'localhost';
  self.port = args.port || 80;
  self.protocol = args.protocol || 'http';
  self.auth = args.auth;
  self.timeout = args.timeout;
  self.logging = args.logging;

  var client = null;
  if (self.protocol === 'http') {
    client = http;
  } else {
    client = https;
  }

  // self.logger = http_logger(self);

  // To avoid multiple callbacks, wrap the original callback in a new one
  // that tracks whether the callback has already been called.
  function protected_callback(cb) {
    var called_back = false;
    return function () {
      if (!called_back) {
        called_back = true;
        cb.apply(this, arguments);
      }
    };
  }

  self.request = function (args, cb) {
    cb = protected_callback(cb);

    if (!args) {
      return cb(new Error('Elasticsearch error: args required in http client'));
    }

    var req_options = {
      path: path.join('/', append_params(args.path, args.params)),
      method: args.method || 'GET',
      host: self.host,
      port: self.port
    };

    var request = client.request(req_options);

    if (self.timeout) {
      request.setTimeout(self.timeout, function () {
        return cb(new Error('Elasticsearch request timed out (' + self.timeout + 'ms)'));
      });
    }

    request.on('error', function (error) {
      return cb(error);
    });

    request.on('response', function (response) {
      var body = '';

      response.on('data', function (chunk) {
        body += chunk;
      });

      response.on('end', function () {
        self.logger.log_response(response, body);
        return cb(null, body);
      });

      response.on('error', function (error) {
        return cb(error);
      });
    });

    if (self.auth) {
      request.setHeader("Authorization", "Basic " + new Buffer(self.auth.username + ":" + self.auth.password).toString('base64'));
    }

    if (args.body || args.method === 'POST' || args.method === 'PUT' || args.method === 'DELETE') {
      if (typeof args.body !== 'string') {
        args.body = JSON.stringify(args.body);
      }

      args.body = args.body || '';

      request.setHeader('Content-Type', 'application/json');
      request.setHeader('Content-Length', Buffer.byteLength(args.body, 'utf8'));
      request.end(args.body);
      self.logger.log_request(args, request);
    } else {
      request.end('');
      self.logger.log_request(args, request);
    }
  };

  self.get = function (args, cb) {
    args.method = 'GET';
    self.request(args, cb);
  };

  self.post = function (args, cb) {
    args.method = 'POST';
    self.request(args, cb);
  };

  self.put = function (args, cb) {
    args.method = 'PUT';
    self.request(args, cb);
  };

  self.del = function (args, cb) {
    args.method = 'DELETE';
    self.request(args, cb);
  };

  return self;
};

module.exports = http_client;
// https://raw.githubusercontent.com/BryanDonovan/node-simple-elasticsearch/master/lib/http_client.js
