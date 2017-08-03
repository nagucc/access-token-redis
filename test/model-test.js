/* global it */
/* global before */
/* global describe */
/* global process */
var should = require("should");
var At = require('../index');


var at = new At('localhost', 32768, 'appId', 7000);

describe("AccessToken model test", function() {

    it('getToken.获取空的或过期的token', function (done) {
        at.getToken(function (err, token) {
            should.exist(err);
            done();
        });
    });

    it('saveToken.设置token', function (done) {
        at.saveToken('token', function (err) {
            should.not.exist(err);
            done();
        });
    });

    it('getToken.获取正确的的token', function (done) {
        at.getToken(function (err, token) {
            should.not.exist(err);
            should.exist(token);
            token.should.eql('token');
            done();
        });
    });
});