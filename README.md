# access-token-redis
使用Redis读取和保存access_token

## 目的
当我们调用某些基于OAuth认证的API时，常常需要使用保存在一定时间范围内有效的access_token信息。
**access-token-redis**组件为此类功能提供了统一的解决方案，使用Redis保存需要access_token。

## 安装
`npm install access-token-redis`

## 用法

### 保存和读取微信企业号平台操作时生成的access_token

```
var API = require('wechat-enterprise-api');

var redis_host = 'localhost';
var redis_prot = 6379;
var appId = 'your appId';
var expire_time = 7000;
var AccessToken = require('access-token-redis'),
    at = new AccessToken(redis_host, redis_port, appId, expire_time);

var wxapi = new API(options.corpId, options.secret, options.agentId,
    function(callback){                     // 获取数据库中保存的access_token
        at.getToken(callback);
    },
    function(token, callback){              // 保存access_token到数据库中
        at.saveToken(token, callback);
    });

```

## API

### 初始化

```

var redis_host = 'localhost';           // redis 服务器host
var redis_prot = 6379;                  // redis端口
var appId = 'your appId';               // app id
var expire_time = 7000;                 // Access token 的保存时间（单位：秒），默认7000

var AccessToken = require('access-token-redis'),
    at = new AccessToken(redis_host, redis_port, appId, expire_time);
    
```


当我们需要使用 **access-token-redis**时，首先需要初始化。

### 读取access_token

`getToken(callback)` 参数：
    - callback 回调函数
        - err
        - token



### 保存access_token

`saveToken(token, callback)` 参数：
    - token
    - callback
        - err
        - token

