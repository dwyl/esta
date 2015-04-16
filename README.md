*esta*  
====
[![Build Status](https://travis-ci.org/nelsonic/esta.png?branch=master)](https://travis-ci.org/nelsonic/esta)
[![Test Coverage](https://codeclimate.com/github/nelsonic/esta/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/esta)
[![Code Climate](https://codeclimate.com/github/nelsonic/esta/badges/gpa.svg)](https://codeclimate.com/github/nelsonic/esta)
[![Dependency Status](https://david-dm.org/nelsonic/esta.svg)](https://david-dm.org/nelsonic/esta)
[![Node version](https://img.shields.io/node/v/esta.svg?style=flat)](http://nodejs.org/download/)
[![NPM Version](https://badge.fury.io/js/esta.svg?style=flat)](https://npmjs.org/package/esta)


**The *Simplest* ElasticSearch Node.js Module**

## Why?

**Q**: There is *already* an "*official*" ElasticSearch module, why create a *new* one...?  
**A**: Have you *tried* ***using*** the *official* client...? Did you *enjoy* the *experience*?

We needed an ***easy*** way to create, read, update and search our ElasticSearch
records from node.js. All the *available* modules were *way too complicated*
to use for *beginners*. So we decided to *invest* the time to create something
***much simpler***!

Creating a record in ElasticSearch from your **node.js** app using **esta** is *this* simple:

```js
var es = require('esta'); // the simplest way to use ElasticSearch in node.js!
es.create({'message':'ElasticSearch is awesome!'}, function(response){
  console.log('record created '+ response.created); // record created true
})
```

As you are about to *discover*, there is a ***much easier*** way to
use ElasticSearch!


##Guide to _esta_ Documentation

**Usage:**
* [Installation](#install)
* [CONNECT to ElasticSearch Cluster](#connect)
* [CRUD](#crud)
  * [CREATE (Save) a (new) record](#create)
  * [READ a record](#read)
  * [UPDATE an (existing) record](#update)
  * [DELETE a record](#delete)
* [SEARCH for Record(s)](#search)
* [STATS](#stats)
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

<a name="connect"/>
#### CONNECT to ElasticSearch Cluster using  `ES.CONNECT(calback(response))`

If you need to *check* the connection status to the ElasticSearch Instance/Cluster
we expose the handy `ES.CONNECT` method:

```js
var ES = require('esta');

ES.CONNECT(index, function (response) {
  console.log(response);
  // for more detailed stats see: STATS method below
});
```
Pass in the index name as the first argument if you have not
set an **ES_INDEX** environment variable.

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

<br />

<a name="crud"/>
###[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Methods

<a name="create"/>
#### CREATE (Save) a (new) record using `ES.CREATE(record, callback(response))`

Creating a new record is *easy*:

```js
// define the record you want to store:
var record = {
  date: new Date().toISOString(),
  message: 'Your amazing message goes here'
};
ES.CREATE(record, function(response) {
 // do what ever you like with the response
});
```
A typical *successful* `ES.CREATE` response:
```js
{ _index: 'index',
  _type: 'type',
  _id: '112669114721',
  _version: 1,
  created: true }
```

##### *Optional Fields* for a *New Record*:

- `index` can be compared to a ***Database*** in **SQL**
see: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-index
- `type` is *like* the ***table*** in **SQL**-world or a *collection* in other NoSQL systems.
see: http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/glossary.html#glossary-type
- `id` is the ***unique key*** for your record. equivalent to the primary-key in a **SQL**-world

<br />

<a name="read"/>
#### READ a record using `ES.READ(record, callback(response))`

READing your record:

```js
// define the record you want to retrieve:
var record = {
  index: 'twitter',
  type: 'tweet',
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
#### UPDATE an (existing) record using `ES.UPDATE(record, callback(response))`

UPDATE an existing record:

```js
// define the record you want to store:
var record = {
  index: 'twitter',
  type: 'tweet',
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

***Note***: **UPDATE** actually performs an [**UPSERT**](http://en.wiktionary.org/wiki/upsert)  
**UP**date record if already *exists* or in**SERT** (create) if its new.

<br />

<a name="delete"/>
#### DELETE a record using `ES.DELETE(record, callback(response))`

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
### SEARCH for Record(s) using `ES.SEARCH(query, callback(response))`

Searching is super easy:

```js
// setup query:
var query = {
  index: 'twitter',
  type:  'tweet',
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
### Get Cluster STATS using `ES.STATS(callback(response))`

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

## "Just Works" (Defaults to 127.0.0.1:9200) [![12 Factor App](https://img.shields.io/badge/twelve%20factor-passing-brightgreen.svg?style=flat)](http://12factor.net/config)

To help you get started as *fast* as possible,
***esta*** defaults to using your local machine
for ElasticSearch.

<a name="local"/>
### Local/Dev Machine [![Beginner Friendly](https://img.shields.io/badge/shoshin-yes-brightgreen.svg?style=flat)](http://en.wikipedia.org/wiki/Shoshin "Beginner Friendly")

Provided you already have ElasticSearch *installed* (we recommend using Vagrant, see below),
there is ***nothing to setup or configure*** to use **esta** on your local machine!

### Heroku [![Heroku Compatible](https://img.shields.io/badge/heroku-yes-brightgreen.svg?style=flat)](https://travis-ci.org/nelsonic/esta/jobs/58582216#L270)

If you are deploying your App to Heroku there are ***two*** ElasticSearch-as-a-Service providers
that offer ***Free*** entry level service:

+ Bonsai: https://addons.heroku.com/bonsai
+ SearchBox: https://addons.heroku.com/searchbox

![heroku-addons-free](https://cloud.githubusercontent.com/assets/194400/7158013/25be8f78-e36d-11e4-8ade-8ab1ade0bb07.png)

**esta** ***supports both*** of these providers **out-of-the-box**!
as soon as you add the "addon" to your heroku app it "***just works***!"

Our Travis Build Process includes checks for both Bonsai and SearchBox:
See: https://travis-ci.org/nelsonic/esta/jobs/58582216#L270

<a name="CI"/>
### (Travis) CI

Speaking of Travis-CI, if you are using their fine build tool, here's a
**sample .travis.yml** file:

```sh
language: node_js
node_js:
  - 0.12
services:
  - elasticsearch
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

all you need to do is run the following commands in your terminal:

```sh
vagrant up
vagrant ssh
sudo service elasticsearch start
```

If you have any questions, just ***ask***!

<br />
<br />

# Philosophy / Background / Detail

## Why Create a New Library?

We wanted something *simpler* and thus *much* easier to extend if you need to!  
**esta** is ***easy*** to understand. The *entire* module is 129 lines of clear/clean/commented/DRY code;
you can read & *understand* it *all* before breakfast!  
Dive in at /**lib**. Each method has a corresponding file in /**test**

![esta-coverage-summary-129](https://cloud.githubusercontent.com/assets/194400/7179628/e41c37f8-e431-11e4-87d2-afd68cd12097.png)

## *Practical* Feature: *Recover Accidentally Deleted Data*

We wanted a way of
"[*soft-deleting*](http://stackoverflow.com/questions/2549839/are-soft-deletes-a-good-idea)"
records (i.e. *avoiding data loss*.)
If you *like* the idea of being able to * **recover accidentally deleted** data*,
you will love our **DELETE** method see: **lib/delete.js**


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

Our aim is to build something that only uses ***core*** modules with
[***Stable APIs***](https://nodejs.org/api/documentation.html#documentation_stability_index),
so we *never* have to *think* about upgrading - it also makes it a
*lot* easier for others to learn how the module works, which
*invites contribution* from the community.  
Given that ElasticSearch has a **REST API** we are *only* using Node's **http** (*core*) module.
and this is kept [**DRY**](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (only in one file)
see: [**lib/http_request.js**](https://github.com/nelsonic/esta/blob/master/lib/http_request.js)

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
or, if you are using [**Hapi.js**](http://hapijs.com/) we recommend using https://github.com/hapijs/poop

For more on Errors, please read: https://www.joyent.com/developers/node/design/errors

<br />
<br />

## ALLCAPS MEHTOD NAMES?

![all caps](http://i.imgur.com/KMZQhDL.png)

We *prefer* to have the **METHOD** names **UPPERCASE**
because it makes them *easy* to spot and *differentiate* from *your* code.
If you feel they are a bit "[*shouty*](http://www.newrepublic.com/article/117390/netiquette-capitalization-how-caps-became-code-yelling)"
 **all methods** are ***available*** in ***lowercase*** too; take your pick!
 see: http://git.io/pZ6t

<a name="name"/>
## Module Name

The choice of module name was the *answer* to the question:

**Q**: Which ElasticSearch Node Module should I use...?  
**A**: https://translate.google.com/#auto/en/esta

<a name="license"/>
## License

[MIT](LICENSE)
