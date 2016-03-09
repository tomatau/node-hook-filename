const assert = require('assert')
const sinon = require('sinon')
const nhf = require('../index')

describe('node-hook-filename module overrides', () => {
  context('Given Override Extensions', ()=> {
    before(()=> {
      nhf([ '.json', 'dummy' ])
    })

    it('should modify require to return the filenames', ()=> {
      const filename = './fixtures/config.json'
      const actual = require(filename)
      assert.equal(actual, filename)
    })

    it('should not modify require for non matched files', ()=> {
      const actual = require('./fixtures/test')
      assert.deepEqual(actual, { not: 'affected' })
    })

    it('should only modify require for a complete string match', ()=> {
      const actual = require('./fixtures/configjson.js')
      assert.deepEqual(actual, { also: 'not affected' })
    })
  })

  context('Given Override Extension With Callback', ()=> {
    const callback = sinon.spy(() => ({ y: 'z' }))

    before(()=> {
      nhf([ '.ext', '.ext2' ], callback)
    })

    afterEach(()=> {
      callback.reset()
    })

    it('should invoke the callback with the matching filename', ()=> {
      const filename = './fixtures/matching.ext'
      require(filename)
      assert.ok(callback.calledWith(filename))
      callback.reset()
      const filename2 = './fixtures/matching.ext2'
      require(filename2)
      assert.ok(callback.calledWith(filename2))
    })

    it('should modify the return value to eql the return from callback', ()=> {
      const filename = './fixtures/matching.ext'
      const actual = require(filename)
      assert.deepEqual(actual, callback())
    })
  })
})
