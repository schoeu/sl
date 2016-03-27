var $ = require('../src/sLib.js');
var expect = require('chai').expect;

describe('sLib测试', function() {
    it('选择器测试', function() {
        expect($('body')).to.be.equal(2);
    });
});
