/* global it */
/* global before */
/* global describe */
/* global process */
var At = require('./index');


setInterval(()=>{
    var at = new At('localhost', 6379, 'appId', 7000);
    at.saveToken('token', function (err) {
        if (!err) {
            console.log('save token success')
        }
    });
    at.getToken(function (err, token) {
        if (err) {
            console.error(err.stack || err);
        }
        console.log(token);
    });
    console.log('----------------\n\n');
}, 1000);

