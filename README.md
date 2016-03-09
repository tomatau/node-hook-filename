[![Circle CI](https://circleci.com/gh/tomatau/node-hook-filename.svg?style=svg)](https://circleci.com/gh/tomatau/node-hook-filename)

# node-hook-filename

Hooking node require calls for specific extensions to only return the filename or the return value of a callback.

## Usage

### Returning filename

```js
const nhf = require('node-hook-filename')

nhf(['.scss', '.svg'])

const scssAsset = require('../path/too/filename.scss')
const svgAsset = require('../path/too/filename.svg')
const normalRequire = require('../path/too/js/file')

// scssAsset === '../path/too/filename.scss'
// svgAsset === '../path/too/filename.svg'

// normalRequire is unaffected
```

### Passing a callback function

```js
const nhf = require('node-hook-filename')
nhf(['config'], (filename) => 'foo ' + filename)

const configRequire = require('config')
// configRequire will return 'foo config'
```


Handy if you are running a universal/isomorphic app that requires asset files.

This is mostly useful for **testing** and not production ready!

Greatly influenced by https://github.com/bahmutov/node-hook
