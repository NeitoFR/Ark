"use strict"
var Client = require('mariasql');
require('dotenv').config();

var init = function(){
    var c = new Client({
        
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        db: process.env.DB_NAME,
        port: process.env.DB_PORT
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
    //console.log(query);
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
exports.addComment = function (data, callback) {
    //console.log('data', data)
    var c = init(),
    toAppend = '|'+Object.keys(data)+"|"+data[Object.keys(data)[0]],
    query = 'UPDATE mission SET commentaire = CONCAT(commentaire, \''+toAppend+'\') WHERE id_mission=1';
    
    //console.log('comment to append : ', toAppend);
    c.query(query, function(err, res){
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
exports.getCommentThread = function (callback){
    var c = init(),
    query ="SELECT commentaire FROM mission WHERE id_mission = 1"

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
exports.getAlertByStatus = function (status, callback){
    var c = init(),
    query = "SELECT id_mission, nom FROM mission WHERE status = "+status+';';
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