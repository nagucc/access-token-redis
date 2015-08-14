var moment = require('moment');
var redis = require('redis');


/**
 * @param options
 * 指定参数。
        - host redis服务器地址
        - port redis端口
        - appId 要保存的token的appId
        - expire 过期时间(秒)，默认为7000
 */
var At = function (host, port, appId, expire) {
    this.host = host;
    this.port = port;
    this.appId = appId;
    this.expire = expire;

    var client = redis.createClient(this.port, this.host, {});
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    this.client = client;
};


// 获取指定的AccessToken

At.prototype.getToken = function (callback) {
    var self = this;
    self.client.get(self.appId +'.expire', function(err, date){
        if(err || !date) callback('err');            
        else if(moment().isBefore(date)) {                                // 还在有效期内
            self.client.get(self.appId + '.token', function(err, token){
                if(err || !token) callback('error');
                else callback(err, token);
            });
        } else callback('err');
    });
};

At.prototype.saveToken = function (token, callback) {
    var self = this;
    self.expire = self.expire || 7000;
    
    self.client.set(self.appId + '.token', token);
    self.client.set(self.appId + '.expire', moment().add(self.expire, 's'));
    callback(null, token);
}

module.exports = At;