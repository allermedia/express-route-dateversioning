express-route-dateversioning
============================

Express middleware for versioning routes according dates.


## Why to use?

Date versioning your API enables you to develop and release your API in individual pieces or
microservices. Defining the API date version lets to defer any of the versions released after
the date, keeping your API consistent over time without having to define rigid numeric versions.


## Install

```sh
$ npm install express-route-dateversioning --save
```


## Usage

### Setting up the server

```javascript
const express = require('express');
const version = require('express-route-dateversioning');

let app = express();

// Version root middleware
app.get('/', version({
  '2017-01-18': (req, res) => { res.send('new pong'); },
  '2016-10-01': (req, res) => { res.send('old ping'); },
}));
```


### Doing a request to versioned API 

Api version can be defined either with `apiversion` query parameter or custom header

```javascript
const request = require('request');

request.get('http://api.com/thing/1?apiversion=2017-01-19');
```

```javascript
const request = require('request');

request({
  method: 'get',
  uri: 'http://api.com/thing/1',
  headers: {
    'apiversion': '2017-01-19'
  }
});
```


### Custom configuration

Default query param (`apiversion`) and header (`apiversion`) names are also configurable

__Note!__ This should be done before any versioned routes are set

```javascript
const version = require('express-route-dateversioning');
version.config({
  queryparam: 'custom-apiversion',
  header: 'custom-apiversion'
});
```
