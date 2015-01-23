esta
====

**The *Simplest* ElasticSearch Node.js Module**

## Install

```sh
npm install esta --save
```

## Methods

### Basic [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

- [x] Connect to ES Cluster (confirm we can *access* ES)
- [x] Create/Save a record (basic POST request)
- [x] Read a record
- [x] Update a record
- [x] Delete (hard)

### Advanced

- [x] **Upsert** (*convenience* method)
- [x] delete (soft = archive)
- [ ] search :-)


# Philosophy / Background / Detail

## *Only* Core Modules [![Dependency Status](https://david-dm.org/nelsonic/esta.svg)](https://david-dm.org/nelsonic/esta)

***Zero external dependencies*** (3rd party modules).

There are quite a few modules in the
[node ecosystem](https://www.npmjs.org/) for
use with ElasticSearch.
When I saw how many dependencies the "Official" ElasticSearch
Node.js Module
https://github.com/elasticsearch/elasticsearch-js
had and *especially* the number of
[DevDependencies](https://david-dm.org/elasticsearch/elasticsearch-js#info=devDependencies),
it made it hard to
[*contribute*](https://github.com/elasticsearch/elasticsearch-js/issues/158)
to the project...

My aim is to build something that only uses *core* modules with *frozen* APIs,
so I *never* have to *think* about upgrading - it also makes it a
*lot* easier for others to learn how the module works, which
*invites contribution* from the community.

### Dev Dependencies [![devDependency Status](https://david-dm.org/nelsonic/esta/dev-status.svg)](https://david-dm.org/nelsonic/esta#info=devDependencies)

We *carefully* select and only use *well-maintained* "*pure*" JavaScript modules
in our development toolchain:

+ **Tape** for testing: https://github.com/substack/tape
+ **Istanbul** for Code Coverage: https://github.com/nelsonic/learn-istanbul
+ **Chalk** for colors in test output (readability)
+ **Faker** for creating *fake* records in tests: https://github.com/marak/Faker.js/
+ **Pre-commit** for ensuring all commits pass strict quality checks before being pushed to GitHub. see: https://github.com/nelsonic/learn-pre-commit
+ **jshint** checks code style is consistent:
https://github.com/nelsonic/learn-jshint
+ **CodeClimate** for tracking code quality and test coverage.


## Code Quality [![Build Status](https://travis-ci.org/nelsonic/esta.svg)](https://travis-ci.org/nelsonic/esta) [![Coverage Status](https://img.shields.io/coveralls/nelsonic/esta.svg?style=flat)](https://coveralls.io/r/nelsonic/esta?branch=master) [![Code Climate](https://codeclimate.com/github/nelsonic/esta/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/esta)

If you are looking for a module you can *trust*, these are the
"badges" you are looking for.


## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/nelsonic/esta/fork)

***All*** *contributions* are *welcome*.  
If anything is unclear please create an issue:
https://github.com/nelsonic/esta/issues


## Module Name

The choice of module name was the *answer* to the question:

**Q**: Which ElasticSearch Node Module should I use...?  
**A**: https://translate.google.com/#auto/en/esta



### [Promises](http://youtu.be/llDikI2hTtk?t=21s) (Rant?)

I love the *theory* behind Promises:  
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise  
The *justification* for using them is quite convincing:  
https://github.com/petkaantonov/bluebird#what-are-promises-and-why-should-i-use-them  

But I've not yet found a situation where I *needed* to use them.  
When I see *junior* developers using
[Q](https://www.npmjs.org/package/q),  [when](https://github.com/cujojs/when),  
[promise](https://github.com/then/promise),
[Bluebird](https://github.com/petkaantonov/bluebird), etc.
I can't help but think:  
what are you *doing* that was ***too complicated for callbacks***?  

So when a module *forces* me to use them
["***its a no from me***"](http://i.imgur.com/TgTX9Kf.jpg)

![promises broken](http://i.imgur.com/3bzRW8y.jpg)
