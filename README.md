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

var AccessToken = require('access-token-redis'),
    At = new AccessToken('your appId', 'your secret', 7000, {
        port: 6379,
        host: 'localhost',
        opt: {}
    });
var wxapi = new API('your appId', 'your secret', 0,
    At.getToken,                     // 获取数据库中保存的access_token
    At.saveToken                     // 保存access_token到数据库中
);

```

## API

### 初始化

```
var AccessToken = require('access-token-redis'),
    At = new AccessToken('your appId', 'your secret', 7000, {
        port: 6379,
        host: 'localhost',
        opt: {}
    });
    
```


当我们需要使用 **access-token-redis**时，首先需要初始化。

### 读取access_token

`AccessToken.getToken(callback)`



### 保存access_token

`AccessToken.saveToken(token, callback);`

