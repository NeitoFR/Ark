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
            callback(err, null);
        }
        else{
            c.end();
            callback(null, res);
        }
    });
}
//Authentication related query
exports.createUser = function (data, callback){
    var c = init();
    var query = 'INSERT INTO `USER_TABLE` (`id_user`, `username`, `password`, `group_id`) \
    VALUES (NULL, \''+data.username+'\', \''+data.password+'\', \'0\');';
    console.log(query);
    c.query(query, function(err, res)
    {
        if (err){
            c.end();
            callback(err, null);
        }
        else{
            c.end();
            callback(null, res);
        }
    });
    
    
}
exports.verifyUser = function (data, callback) {
    var c = init(),
    
    query = 'SELECT `username` FROM USER_TABLE WHERE `username` = \''+data.username+'\' AND `password` = \''+data.password+'\';';
    
    c.query(query, function(err, res)
    {
        if (err){
            c.end();
            callback(err, null);
        }
        else{
            c.end();
            callback(null, res);
        }
        
    });
}

