var Module = require('module');

var originalResolve = Module._resolveFilename;

module.exports = function(extensions, override) {
  extensions.forEach(function(ext) {
    Module._extensions[ext] = function(module, filename) {
      module.exports = filename;
    }
  });

  var regexes = extensions.map(function(ext){ return new RegExp(ext, '') })

  Module._resolveFilename = function(request, parent) {
    if (regexes.some(function(regex){ return request.match(regex) })) {
      if (override) {
        return originalResolve.call(this, override, parent);
      }
      return request;
    }
    return originalResolve.call(this, request, parent);
  }
};
