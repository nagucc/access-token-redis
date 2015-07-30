/**
 * Created by 文琪 on 2015/3/1.
 */
var redis = require('redis');  
var moment = require('moment');

/**
 * 参数
 * appId
 * secret
 * expire 过期时间，单位为秒
 * @param redisOpt
 * 数据库连接参数
    * port 端口，默认为6379
    * host 数据库地址，默认为localhost
    * opt 其他redis参数
 */
var At = function(appId, secret, expire, options){
    var self = this;
    this.appId = appId;
    this.secret = secret;
    this.expire = expire || 7000;
    this.redisOpt = {
        port : options.port || 6379,
        host : options.host || 'localhost',
        opt  : options.opt || {}
    };
    this.keys = {
        at: self.appId + '.' + self.secret + '.at',
        expireDate: self.appId + '.' + self.secret + '.expireDate'
    };
};

At.prototype.getToken = function(cb){
    var self = this;
    var client = redis.createClient(self.redisOpt.port,
        self.redisOpt.host, self.redisOpt.opt);
    client(self.keys.expireDate, function(err, date){
        if(err) cb(err);
        else if(moment().isBefore(date)) {      // token还在有效期
            client.get(self.keys.at, cb);
        } else cb('err');
    });
};

At.prototype.saveToken = function(token, cb){
    var self = this;
    var client = redis.createClient(self.redisOpt.port,
        self.redisOpt.host, self.redisOpt.opt);
    client.set(self.keys.at, token);
    client.set(self.keys.expireDate, moment().add(self.expire, 's'));
    cb(null, token);
}


module.exports = At;