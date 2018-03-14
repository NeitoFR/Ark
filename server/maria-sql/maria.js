"use strict"
var Client = require('mariasql');

var init = function(){
    var c = new Client({
        host: '176.31.103.83',
        user: 'root',
        password: 'mawo',
        db:'TP_Ark',
        port: 3306
    });
    
    return c;
}

exports.getUsers = function (callback){
    var c = init();

    c.query('SELECT * FROM USER_TABLE', function(err, res)
    {
        if (err){
            c.end();
            callback(err, null);}
        else{
            c.end();
            callback(null, res);}
    });
    /*return new Promise((resolve, reject) => {
        var c = init();
        c.query('SELECT * FROM USER_TABLE', (err, result) => {
            if(err) {return reject(err)}
            return resolve(result)
        })
    })*/
}