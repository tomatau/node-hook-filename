# node-hook-filename
Hooking node require calls for specific extensions to only return the filename or a specified module


## Usage

### Returning filename

```js
var nhf = require('node-hook-filename');


nhf(['.scss', '.svg']);


var scssAsset = require('../path/too/filename.scss');
var svgAsset = require('../path/too/filename.svg');
var normalRequire = require('../path/too/js/file');

// scssAsset === '../path/too/filename.scss'
// svgAsset === '../path/too/filename.svg'

// normalRequire is unaffected
```

### Returning a specified module

```js
var nhf = require('node-hook-filename');
nhf(['config'], './config/dev');

var configRequire = require('config');
// configRequire will be the export of ./config/dev.js
```


Useful if you are running a universal/isomorphic app that requires asset files.

This is mostly useful for **testing** and not production ready!

Greatly influenced by https://github.com/bahmutov/node-hook
