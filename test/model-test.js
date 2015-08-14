/* global it */
/* global before */
/* global describe */
/* global process */
var should = require("should");



// 初始化需要测试的model

var Model = {};

describe("AccessToken model test", function() {
	before(function (done) {
        
	});

    it('getToken.获取空的或过期的token', function (done) {
        Model.getToken({
            appId: 'appId',
            appSecret: 'secret'
        }, function (err, token) {
            should.exist(err);
            done();
        });
    });

    it('saveToken.设置token', function (done) {
        Model.saveToken({
            appId: 'appId',
            appSecret: 'secret',
            expire: 10
        }, 'token', function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('getToken.获取正确的的token', function (done) {
        Model.getToken({
            appId: 'appId',
            appSecret: 'secret'
        }, function (err, token) {
            should.not.exist(err);
            should.exist(token);
            token.should.eql('token');
            done();
        });
    });

});