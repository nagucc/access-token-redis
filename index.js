var moment = require('moment');
var redis = require('redis');

var client;

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

    if (!client) {
        console.log('init redis connection');
        client = redis.createClient(this.port, this.host, {});
        client.on("error", function (err) {
            console.error(err.stack || err);
            client = null;
        });
    }
    this.client = client;
};


// 获取指定的AccessToken

At.prototype.getToken = function (callback) {
    var self = this;
    self.client.get(self.appId +'.expire', function(err, date){
        if(err) callback(err);                                                      // redis 发生错误
        else if(date && moment().isBefore(moment(date, 'YYYY-MM-DD HH:mm:ss'))) {        // 还在有效期内
            console.log('date: ' + date);
            self.client.get(self.appId + '.token', function(err, token){
                if(err || !token) callback(err || 'token is not valid');
                else {
                    console.log('token:' + token);
                    callback(err, JSON.parse(token));
                }
            });
        } else callback();
    });
};

At.prototype.saveToken = function (token, callback) {
    var self = this;
    self.expire = self.expire || 7000;
    console.log('token will save: ' + JSON.stringify(token))
    self.client.set(self.appId + '.token', JSON.stringify(token));
    self.client.set(self.appId + '.expire', moment().add(self.expire, 's').format('YYYY-MM-DD HH:mm:ss'));
    console.log('expire date: ' + moment().add(self.expire, 's').format('YYYY-MM-DD HH:mm:ss'));
    callback(null, token);
}

module.exports = At;