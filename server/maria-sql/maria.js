"use strict"
var Client = require('mariasql');

var init = function(){
    var c = new Client({
        host: '176.31.103.83',
        user: 'root',
        password: 'mawo',
        port: 3306
    });

    return c;
}

exports.getUsers = function(){
    var c = this.init(),
    res = "";
    c.query('SHOW DATABASES', function(err, rows) {
        if (err)
            throw err;
        res = rows;
    });
    c.end();

    return res;
}