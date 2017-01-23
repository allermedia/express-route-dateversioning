express-route-dateversioning
============================

Express middleware for versioning routes according dates.


## Why to use?

Date versioning your API enables you to develop and release your API in individual pieces or
microservices. Defining the API date version lets to defer any of the versions released after
the date.


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


### Requesting 

```javascript
```
