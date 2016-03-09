const Module = require('module')
const originalLoad = Module._load

module.exports = function(extensions, override) {
  override = override ? override : (r) => r

  extensions.forEach((ext) => {
    Module._extensions[ext] = (module, filename) => {
      module.exports = filename
    }
  })

  Module._load = function(request, parent, isMain) {
    const requestMatchesExt = (ext) => request.includes(ext)
    if (extensions.some(requestMatchesExt)) {
      return override(request)
    }
    return originalLoad.call(this, request, parent, isMain)
  }
}
