const Module = require('module')
const path = require('path')

const originalLoad = Module._load

module.exports = function(regexs, override) {
  override = override ? override : request => request

  Module._load = function(request, parent, isMain) {
    return regexs.some(regex => regex.test(request))
      ? override(request, parent)
      : originalLoad.call(this, request, parent, isMain)
  }
}

module.exports.normalize = (request, parent) =>
  path
    .resolve(parent.id, '..', request)
    .replace(path.parse(process.cwd()).dir, '')
