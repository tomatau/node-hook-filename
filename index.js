var Module = require('module');

var originalResolve = Module._resolveFilename;

module.exports = function(extensions) {
  extensions.forEach(function(ext) {
    Module._extensions[ext] = function(module, filename) {
      module.exports = filename;
    }
  })

  var regexes = extensions.map(function(ext){ return new RegExp(ext, '') })

  Module._resolveFilename = function(request, parent) {
    if (regexes.some(function(regex){ return request.match(regex) })) {
      return request;
    }
    return originalResolve.call(this, request, parent);
  }
}
