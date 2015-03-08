*esta*  
====
[![Node.js Version][node-version-image]][node-version-url] [![NPM Version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url] [![Test Coverage][coveralls-image]][coveralls-url]
[![Code Climate](https://codeclimate.com/github/nelsonic/esta/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/esta)
[![Dependency Status](https://david-dm.org/nelsonic/esta.svg)](https://david-dm.org/nelsonic/esta)


**The *Simplest* ElasticSearch Node.js Module**

##Guide to _esta_ Documentation

**Usage:**
* [Installation](#install)
* [CRUD](#crud)
  * [CONNECT to ElasticSearch Cluster](#connect)
  * [CREATE (Save) a (new) record](#create)
  * [READ a record](#read)
  * [UPDATE an (existing) record](#update)
  * [DELETE a record](#delete)
* [Search for Record(s)](#search)
* [STATS](#stats)
* [UPSERT (Convenience Method)](#upsert)
* [Error handling](#error-handling)
* [Local/Dev Machine](#local)
* [(Travis) CI](#CI)
* [(*Optional*) Use *Vagrant* to Run ElasticSearch](#vagrant)

**Philosophy / Background / Detail:**
* [*Only* Core Modules](#core-only)
  * [Dev Dependencies](#dev-dependencies)
* [Code Quality](#code-quality)
* [Contributing](#contributing)
* [Module Name](#name)
* [License](#license)

<a name="usage"/>
## Usage

[Installation](#installation)

<a name="install"/>
### Install from [NPM](https://www.npmjs.com/package/esta)

```sh
npm install esta --save
```
<a name="crud"/>
###[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Methods

<a name="connect"/>
#### CONNECT to ElasticSearch Cluster >  ES.CONNECT(calback(response))

If you need to check the connection status to the ElasticSearch Instance/Cluster
we expose the handy `ES.CONNECT` method:

```js
var ES = require('../lib/index');

ES.CONNECT(function (response) {
  console.log(response);
});
```
example `ES.CONNECT` [response](https://travis-ci.org/nelsonic/esta/jobs/53533613#L158):

```js
{ status: 200,
  name: 'Ultragirl',
  cluster_name: 'elasticsearch',
  version:
   { number: '1.4.2',
     build_hash: '927caff6f05403e936c20bf4529f144f0c89fd8c',
     build_timestamp: '2014-12-16T14:11:12Z',
     build_snapshot: false,
     lucene_version: '4.10.2' },
  tagline: 'You Know, for Search' }
```
***Note***: **Esta** *expects* you to have environment variables set up for
**ES_HOST** and **ES_PORT** (see below)

<br />

<a name="create"/>
#### CREATE (Save) a (new) record > ES.CREATE(record, callback(response))

Creating a new record is *easy*:

```js
// define the record you want to store:
var record = {
  type: 'tweet',
  index: 'twitter',
  id: Math.floor(Math.random() * (100000)), // or what ever GUID you want
  message: 'Your amazing message goes here'
};
ES.CREATE(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.CREATE` response:
```js
{ _index: 'twitter',
  _type: 'tweet',
  _id: '112669114721',
  _version: 1,
  created: true }
```

##### *Required Fields* for a *New Record*:

- `index` can be compared to a ***Database*** in **SQL**
see: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index
- `type` is *like* the ***table*** in **SQL**-world or a *collection* in other NoSQL systems.
see: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type
- `id` is the ***unique key*** for your record. equivalent to the primary-key in a **SQL**-world

<br />

<a name="read"/>
#### READ a record > ES.READ(record, callback(response))

READing your record:

```js
// define the record you want to retrieve:
var record = {
  type: 'tweet',
  index: 'twitter',
  id: 1234, // or what ever GUID you want to lookup
};
ES.READ(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.READ` response:
```js
{ _index: 'twitter',
  _type: 'tweet',
  _id: '735981868114',
  _version: 1,
  found: true,
  _source: { message: 'My Awesome Message' }
}
```
Here **_source** is the original data you inserted as the **record**.

##### Record NOT Found

When a record does not exist `response.found` is `false`. e.g:

```js
{ _index: 'twitter',
  _type: 'tweet',
  _id: '804164689732',
  found: false }
```

##### *Required Fields* for a READing a Record

- `index` we need to know which "[database](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index)" our record is in
- `type` "[table](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type)"
- `id` the ***unique key*** for the record you are looking up.

<br />

<a name="update"/>
#### UPDATE an (existing) record > ES.UPDATE(record, callback(response))

UPDATE an existing record:

```js
// define the record you want to store:
var record = {
  type: 'tweet',
  index: 'twitter',
  id: 1234, // or what ever GUID you want
  message: 'Revised message'
};
ES.UPDATE(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.UPDATE` response:
```js
{ _index: 'twitter',
  _type: 'tweet',
  _id: '639403095701',
  _version: 2,
  created: false }
```
Notice how the **_version** gets incremented to **2**

##### *Required Fields* for a *Updating* an *Existing Record*:

- `index` we need to know which "[database](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index)" our record is in
- `type` "[table](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type)"
- `id` the ***unique key*** for the record you are updating.

<br />

<a name="delete"/>
#### DELETE a record > ES.DELETE(record, callback(response))

```js
// define the record you want to store:
var record = {
  type: 'tweet',
  index: 'twitter',
  id: 1234, // or what ever GUID you want
  message: 'Revised message'
};
ES.DELETE(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.DELETE` response:
```js
{ found: true,
  _index: 'twitter',
  _type: 'tweet',
  _id: '137167415115',
  _version: 2,
  deleted: true }
```
Notice how the **deleted** is **true**

##### *Required Fields* for a *Deleting* an *Existing Record*:

- `index` we need to know which "[database](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index)" our record is in
- `type` "[table](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type)"
- `id` the ***unique key*** for the record you are updating.

***Obviously*** if the record is ***NOT Found***, there is nothing to delete.
In that case, the response look like this: (**found** is ***false***)
```js
{ found: false,
  _index: 'twitter',
  _type: 'tweet',
  _id: '951078315032',
  _version: 1 }
```


<br />

<a name="search"/>
### Search for Record(s) > ES.SEARCH(query, callback(response))

Searching is super easy:

```js
// setup query:
var query = {
  type:  'tweet',
  index: 'twitter',
  field: 'text',     // the field we want to search in
  text:  'amazing'   // string we are searching for
};

SEARCH(query, function(response) {
  // console.log(res);
  t.equal(res.hits.total > 0, true,
    chalk.green("✓ Search results found: "+ res.hits.total));
  t.end();
});
```
A typical *successful* `ES.SEARCH` response:
```js
{ took: 8,
  timed_out: false,
  _shards: { total: 5, successful: 5, failed: 0 },
  hits:
   { total: 924,
     max_score: 0.6355637,
     hits:
      [ [Object],
        [Object],
        etc...
  }
}
```
The **response.hits.total** is **924**
(the number of records that matched our SEARCH query)

##### *Required Fields* for a *SEARCHing*:

- `index` we need to know which "[database](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index)" our record is in
- `type` "[table](http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type)"
- `field` the field in the record you want to search in.
- `text` the text you are searching for.


When ***NO RECORDS*** are **FOUND** the **response** will look this:

```js
{ took: 2,
  timed_out: false,
  _shards: { total: 5, successful: 5, failed: 0 },
  hits: { total: 0, max_score: null, hits: [] } }
```
We check for `if(response.hits.total > 0) { /* use/display results */ } else { /* show sad face */}`  
Here's the image we use:

![no results](http://i.imgur.com/zHuBUbs.png)

<br />

<a name="stats"/>
### STATS > ES.STATS(callback(response))

The ES.**STATS** method exposes the ElasticSearch Instance/Cluster `_stats`
see: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/indices-stats.html

```js
STATS(function (response) {
  // do something awesome response
});
```
ElasticSearch returns *rich* information on cluster health, document count etc.
see: [#31](https://github.com/nelsonic/esta/issues/31) for *complete* STATS output

<br />

<a name="upsert"/>
### UPSERT (Convenience Method)

**UPSERT** = **UP**date record if *exists* or inSERT (create) if its new.
(Seems like an *obvious* thing to have, yet ElasticSearch does not provide it,
so we built it.)

**UPSERT** a record:

```js
// define the record you want to store:
var record = {
  type: 'tweet',
  index: 'twitter',
  id: 1234, // or what ever GUID you want
  message: 'Revised message'
};
ES.UPSERT(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.UPSERT` response:
```js
{ _index: 'twitter',
  _type: 'tweet',
  _id: '639403095701',
  _version: 2,
  created: false }
```

Under the hood this just does a **READ** and
if the record already exists, **UPDATE** it,
otherwise **CREATE** it.

<br />
<a name="error-handling"/>
### Error Handling

#### *Warning*: Contains *Opinion* (based on *experience*)

Most of the Node.js developers I've worked with, don't handle errors well.  
A typical (*bad*) example:
```js
if(error) {
  console.log(error); // this is worse than useless!
}
```
So instead of having of having code full of `if(err) ...`
we have *deliberately* cut out errors
from callback functions *completely*.

Thus, *all* the methods in this module have the *simplified* signature:
```js
ES.METHOD(record, function(response){
  // do something with response
});
```

Instead, we propose using a *central* error catcher. e.g:
```js
process.on('uncaughtException', function(err) {
  console.log('ERROR: ' + err); // preferably handle errors appropriately
});
```
or, if you are using [**Hapi.js**](http://hapijs.com/) use https://github.com/hapijs/poop

For more on Errors, please read: https://www.joyent.com/developers/node/design/errors

<br />
<br />

## *Required*: Use *Environment Variables* for HOST & PORT [![12 Factor App](https://img.shields.io/badge/twelve%20factor-passing-brightgreen.svg?style=flat)](http://12factor.net/config)

We need to move away from using **config** ***files***.  
Read: http://12factor.net/config (Store config in the environment - *no more config.json*!)

<a name="local"/>
### Local/Dev Machine

To use environment variables for HOST & PORT on your local machine:
you will need to run the following **Shell Commands**:

```sh
export ES_HOST="127.0.0.1"
export ES_PORT=9200
```
<a name="CI"/>
### (Travis) CI

Sample .travis.yml file:

```sh
language: node_js
node_js:
  - 0.10
services:
  - elasticsearch
env:
  - ES_HOST="127.0.0.1" ES_PORT=9200
```
if you are *new* to Travis-CI see: https://github.com/docdis/learn-travis

<a name="vagrant"/>
## (*Optional*) Use *Vagrant* to Run ElasticSearch [![vagrant up](https://img.shields.io/badge/vagrant-up-brightgreen.svg?style=flat)](https://github.com/nelsonic/learn-vagrant)

If, like me you prefer not to have Java running on your dev machine
(because its [*chronically* insecure](http://krebsonsecurity.com/2014/04/critical-java-update-plugs-37-security-holes/))
I *highly* recommend using **Vagrant** to run a light-weight virtual machine
to isolate ElasticSearch and only install Java in the VM.

The other obvious benefit of using Vagrant is that all your fellow developers
will have exactly the same (latest) build so there's no risk of version
incompatibility. Learn more at: https://github.com/nelsonic/learn-vagrant

I've included a **Vagrantfile** in this repo which will get you
up-and-running with Ubuntu, Node.js & ElasticSearch with a single command: [**vagrant up**](https://github.com/nelsonic/learn-vagrant)

If you have any questions, just ***ask***!

<br />
<br />

# Philosophy / Background / Detail

<a name="core-only"/>
## *Only* Core Modules [![Dependency Status](https://david-dm.org/nelsonic/esta.svg)](https://david-dm.org/nelsonic/esta)

***Zero external dependencies*** (3rd party modules).

There are quite a few modules in the
[node ecosystem](https://www.npmjs.com/search?q=elasticsearch) for
use with ElasticSearch.
However, when I saw how *many* dependencies the "Official" ElasticSearch
Node.js Module
https://github.com/elasticsearch/elasticsearch-js
had and *especially* the number of
[DevDependencies](https://david-dm.org/elasticsearch/elasticsearch-js#info=devDependencies),
it made it hard to
[*contribute*](https://github.com/elasticsearch/elasticsearch-js/issues/158)
to the project...

Our aim is to build something that only uses *core* modules with *frozen* APIs,
so I *never* have to *think* about upgrading - it also makes it a
*lot* easier for others to learn how the module works, which
*invites contribution* from the community.

<a name="dev-dependencies"/>
### Dev Dependencies [![devDependency Status](https://david-dm.org/nelsonic/esta/dev-status.svg)](https://david-dm.org/nelsonic/esta#info=devDependencies)

We *carefully* select and only use *well-maintained* "*pure*" JavaScript modules
in our development toolchain:

+ **Tape** for testing: https://github.com/substack/tape
+ **Istanbul** for Code Coverage: https://github.com/nelsonic/learn-istanbul
+ **Chalk** for colors in test output (readability)
+ **Pre-commit** for ensuring all commits pass strict quality checks before being pushed to GitHub. see: https://github.com/nelsonic/learn-pre-commit
+ **jshint** checks code style is consistent:
https://github.com/nelsonic/learn-jshint
+ **CodeClimate** for tracking code quality and test coverage:
https://github.com/nelsonic/learn-codeclimate

<a name="code-quality"/>
## Code Quality [![Build Status](https://travis-ci.org/nelsonic/esta.svg)](https://travis-ci.org/nelsonic/esta) [![Test Coverage](https://codeclimate.com/github/nelsonic/esta/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/esta) [![Code Climate](https://codeclimate.com/github/nelsonic/esta/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/esta)

If you are looking for a module you can *trust*, these are the
"badges" you are looking for.

<a name="contributing"/>
## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/nelsonic/esta/fork)

***All*** *contributions* are *welcome*.  
If anything is unclear please create an issue:
https://github.com/nelsonic/esta/issues

**Note**: at *present* **DELETE** does ***not work*** on **Heroku**.
We have an issue to fix this: https://github.com/nelsonic/esta/issues/49
If you have time to help, let us know! [![Heroku Support](https://img.shields.io/badge/heroku%20support-work%20in%20progress-yellow.svg?style=flat)](https://github.com/nelsonic/esta/issues/49)

<a name="name"/>
## Module Name

The choice of module name was the *answer* to the question:

**Q**: Which ElasticSearch Node Module should I use...?  
**A**: https://translate.google.com/#auto/en/esta

<a name="license"/>
## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/esta.svg?style=flat
[npm-url]: https://npmjs.org/package/esta
[node-version-image]: https://img.shields.io/node/v/esta.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[downloads-image]: https://img.shields.io/npm/dm/esta.svg?style=flat
[downloads-url]: https://npmjs.org/package/esta
[travis-image]: https://img.shields.io/travis/nelsonic/esta.svg?style=flat
[travis-url]: https://travis-ci.org/nelsonic/esta
[coveralls-image]: https://img.shields.io/coveralls/nelsonic/esta.svg?style=flat
[coveralls-url]: https://coveralls.io/r/nelsonic/esta?branch=master
[dependencies-url]: https://david-dm.org/nelsonic/esta
[dependencies-image]: https://david-dm.org/nelsonic/esta.svg
