este
====

**The *Simplest* ElasticSearch Node.js Client**





## Methods

- [x] connection to ES Cluster
- [ ] saving/creating a record
- [ ] reading a record
- [ ] update a record
- [ ] delete (hard)
- [ ] delete (soft = archive)
- [ ] search :-)

![este train line graffiti](http://i.imgur.com/HBJ5JmX.jpg)

# Philosophy / Detail

## Core Modules Only

*Zero* external dependencies (3rd party modules).

[![Dependency Status](https://david-dm.org/nelsonic/este.svg)](https://david-dm.org/nelsonic/este)
[![devDependency Status](https://david-dm.org/nelsonic/este/dev-status.svg)](https://david-dm.org/nelsonic/este#info=devDependencies)

There are *many* great modules in the
[node ecosystem](https://www.npmjs.org/).
When I saw how many dependencies the "Official" ElasticSearch
Node.js Module
https://github.com/elasticsearch/elasticsearch-js
had and *especially* the number of
[DevDependencies](https://david-dm.org/elasticsearch/elasticsearch-js#info=devDependencies),
it made it hard to
[*contribute*](https://github.com/elasticsearch/elasticsearch-js/issues/158)
to the project...

My aim is to build something that only uses *core* modules,
so I *never* have to *think* about upgrading - it also makes it a
*lot* easier for others to learn how the module works, which
invites contribution from the community.

## Code Quality

[![Build Status](https://travis-ci.org/nelsonic/este.svg)](https://travis-ci.org/nelsonic/este)
[![Coverage Status](https://img.shields.io/coveralls/nelsonic/este.svg)](https://coveralls.io/r/nelsonic/este?branch=master)
[![Code Climate](https://codeclimate.com/github/nelsonic/este/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/este)
