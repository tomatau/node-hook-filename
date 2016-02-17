'use strict';
const assert = require('assert'),
    nhf = require('../index');

describe('node-hook-filename module overrides', () => {

    it('require should return filename instead of module', () => {

        nhf(['.json']);

        const filename = './config.json';
        const config = require(filename);

        assert.equal(config, filename);
    });

    it('require should call function and return specified string', () => {

        const obj = { 'y' : 'z'};
        nhf(['config'], () => obj);

        const configFile = require('./config');

        assert.equal(configFile, obj);
    });

    it('require should return an original file if no override is specified', () => {

        const original = require('./original.json');
        assert.deepEqual(original,{foo:"bar"});
    });

});