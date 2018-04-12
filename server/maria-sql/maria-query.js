"use strict"
var Client = require('mariasql');
require('dotenv').config();

var init = function(base){
    //console.log(process.env);
    
    var c = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        db: base,
        port: process.env.DB_PORT
    });
    return c;
}

exports.getUsers = function (callback){
    var c = init(process.env.B_USER);
    
    c.query('SELECT * FROM Utilisateurs', function(err, res)
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
    var c = init(process.env.B_USER);
    var query = 'INSERT INTO `Utilisateurs` (`id_Utilisateurs`, `pseudo`, `nom`, `prenom`, `password`, `nb_Alerte`, `nb_Projet`, `id_Groupe`, `email`, `phone`, `pays`, `ville`, `adresse`, `visible`) \
    VALUES (NULL, \''+data.pseudo+'\', \''+data.nom+'\', \''+data.prenom+'\', \''+data.password+'\', \'0\', \'0\', \'1\', \''+data.email+'\', \''+data.phone+'\', \''+data.country+'\', \''+data.city+'\', \''+data.address+'\', \'1\');';
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
    var c = init(process.env.B_USER),
    
    query = 'SELECT `pseudo` FROM Utilisateurs WHERE `pseudo` = \''+data.pseudo+'\' AND `password` = \''+data.password+'\';';
    
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
    var c = init(process.env.B_MISSION),
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
    var c = init(process.env.B_MISSION),
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
    var c = init(process.env.B_MISSION),
    query = "SELECT id_Mission, nom,resume FROM missions WHERE id_Status = "+status+';';
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
exports.createAlert = function (data, callback){
    var c = init(process.env.B_MISSION);
    
    var query = 'INSERT INTO `missions` (`id_Mission`, `nom`, `resume`, `date_creation`, `continent`, `pays`, `ville`, `id_Espece`, `id_Status`, `contenu`, `commentaires`, `valideur`, `invalideur`, `indecis`, `missionnaires`, `donation`, `retour`, `visible`)  \
    VALUES (NULL, \''+data.alertName+'\', \''+data.summary+'\', \'2018-04-12\', \''+data.continent+'\', \''+data.country+'\', \''+data.city+'\', \'212\', \'1\', \'\', NULL, \''+data.desc+'\', \'\', \'\', \'\', \'0\', \'0\', \'0\');';
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