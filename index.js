var Module = require('module');

var originalLoad = Module._load;

module.exports = function(extensions, override) {

  override = override ? override : function(r) { return r };

  extensions.forEach(function(ext) {
    Module._extensions[ext] = function(module, filename) {
      module.exports = filename;
    }
  });

  var regexes = extensions.map(function(ext){ return new RegExp(ext, '') });

  Module._load = function(request, parent, isMain) {

    if (regexes.some(function(regex){ return request.match(regex) })) {
      return override(request);
    }

    return originalLoad.call(this, request, parent, isMain);
  }
};
