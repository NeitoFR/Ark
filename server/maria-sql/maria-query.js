"use strict"
var Client = require('mariasql');
require('dotenv').config();

var init = function (base) {
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

exports.getUsers = function (callback) {
    var c = init(process.env.B_USER);
    
    c.query('SELECT * FROM Utilisateurs', function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getUserInfo = function (id, callback) {
    var c = init(process.env.B_USER);
    var query = "SELECT id_Utilisateurs, pseudo, nom, prenom, nb_Alerte, nb_Projet, id_Groupe, email, phone, pays, ville, adresse FROM Utilisateurs WHERE id_Utilisateurs=\'" + id + "\';";
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.sumbitParticipation = function (data, callback) {
    var c = init(process.env.B_MISSION);
    // console.log(data);
    
    // var query = 'INSERT INTO `Missions` (`id_Utilisateurs`, `pseudo`, `nom`, `prenom`, `password`, `nb_Alerte`, `nb_Projet`, `id_Groupe`, `email`, `phone`, `pays`, `ville`, `adresse`, `visible`) \
    // VALUES (NULL, \''+data.pseudo+'\', \''+data.nom+'\', \''+data.prenom+'\', \''+data.password+'\', \'0\', \'0\', \'1\', \''+data.email+'\', \''+data.phone+'\', \''+data.country+'\', \''+data.city+'\', \''+data.address+'\', \'1\');';
    var query = 'UPDATE Missions SET m_potentiel = CONCAT(m_potentiel, \'' + data.string + '\') WHERE id_Mission=\'' + data.id_Mission + '\';';
    
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.submitAvis = function (data, callback) {
    var c = init(process.env.B_MISSION);
    // callback(null, 'Merci d\'avoir '+data.avis);
    
    // var query = 'INSERT INTO `Missions` (`id_Utilisateurs`, `pseudo`, `nom`, `prenom`, `password`, `nb_Alerte`, `nb_Projet`, `id_Groupe`, `email`, `phone`, `pays`, `ville`, `adresse`, `visible`) \
    // VALUES (NULL, \''+data.pseudo+'\', \''+data.nom+'\', \''+data.prenom+'\', \''+data.password+'\', \'0\', \'0\', \'1\', \''+data.email+'\', \''+data.phone+'\', \''+data.country+'\', \''+data.city+'\', \''+data.address+'\', \'1\');';
    // var query = 'UPDATE Missions SET m_potentiel = CONCAT(m_potentiel, \''+data.string+'\') WHERE id_Mission=\''+data.id_Mission+'\';';
    
    // c.query(query, function(err, res)
    // {
    //     if (err){
    //         c.end();
    //         callback(err, null);
    //     }
    //     else{
    //         c.end();
    //         callback(null, res);
    //     }
    // });
}
exports.updateVCurStep = function (id_Mission, v_cur_step, callback) {
    console.log('id mission ' + id_Mission);
    var c = init(process.env.B_MISSION);
    var query = 'UPDATE missions SET `v_cur_step` = \''+v_cur_step+'\' WHERE id_Mission=\'' + id_Mission + '\';';
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getVCurStep = function (id_Mission, callback) {
    // console.log('id mission ' + id_Mission);
    var c = init(process.env.B_MISSION);
    var query = 'SELECT v_cur_step FROM missions WHERE id_Mission=\'' + id_Mission + '\';';
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
//Authentication related query
exports.createUser = function (data, callback) {
    var c = init(process.env.B_USER);
    var query = 'INSERT INTO `Utilisateurs` (`id_Utilisateurs`, `pseudo`, `nom`, `prenom`, `password`, `nb_Alerte`, `nb_Projet`, `id_Groupe`, `email`, `phone`, `pays`, `ville`, `adresse`, `visible`) \
    VALUES (NULL, \'' + data.pseudo + '\', \'' + data.nom + '\', \'' + data.prenom + '\', \'' + data.password + '\', \'0\', \'0\', \'1\', \'' + data.email + '\', \'' + data.phone + '\', \'' + data.country + '\', \'' + data.city + '\', \'' + data.address + '\', \'1\');';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.verifyUser = function (data, callback) {
    var c = init(process.env.B_USER),
    
    query = 'SELECT id_Utilisateurs, pseudo, nom, prenom, nb_Alerte, nb_Projet, id_Groupe, email, phone, pays, ville, adresse FROM Utilisateurs WHERE `pseudo` = \'' + data.pseudo + '\' AND `password` = \'' + data.password + '\';';
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
        
    });
}
exports.addComment = function (data, callback) {
    // console.log('data', data)
    var c = init(process.env.B_MISSION),
    toAppend = '|' + Object.keys(data)[0] + "|" + data[Object.keys(data)[0]],
    query = 'UPDATE Missions SET commentaires = CONCAT(commentaires, \'' + toAppend + '\') WHERE id_Mission=\'' + data.id + '\';';
    
    //console.log('comment to append : ', toAppend);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getCommentThread = function (id, callback) {
    var c = init(process.env.B_MISSION),
    query = "SELECT commentaires FROM Missions WHERE id_Mission=\'" + id + "\';";
    
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getAlerts = function (wanted, callback) {
    var query;
    
    switch (wanted) {
        case "all":
        query = "SELECT id_Mission, nom, resume FROM Missions";
        break;
        
        case "new":
        
        break;
        
        default:
        break;
    }
    var c = init(process.env.B_MISSION);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.createAlert = function (data, callback) {
    var c = init(process.env.B_MISSION);
    // console.log(data.log);
    
    var query = 'INSERT INTO `Missions` (`id_Mission`, `nom`, `resume`, `date_creation`, `continent`, `pays`, `ville`, `id_Espece`, `id_Status`, `contenu`, `commentaires`, `initiateur`, `v_cur_step`, `m_potentiel`,`m_valider`, `donation`, `retour`,`activity_log`, `visible`)  \
    VALUES (NULL, \'' + data.alertName + '\', \'' + data.summary + '\', \'2018-04-12\', \'' + data.continent + '\', \'' + data.country + '\', \'' + data.city + '\', \'' + data.id_Espece + '\', \'1\', \'' + data.desc + '\', \'\', \'' + data.initiateur + '\', \'||\', \'\', \'\', \'0\', \'0\',\'' + data.log + '\', \'0\');';
    // VALUES (NULL, \''+data.alertName+'\', \''+data.summary+'\', \'2018-04-12\', \''+data.continent+'\', \''+data.country+'\', \''+data.city+'\', \'212\', \'1\', \'\', \'\', \''+data.desc+'\', \'\', \'\', \'\', \'0\', \'0\', \'0\');';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getAlertById = function (id, callback) {
    var c = init(process.env.B_MISSION);
    
    var query = 'SELECT * FROM Missions WHERE id_Mission=\'' + id + '\';';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}
exports.getEspece = function (id, callback) {
    var c = init(process.env.B_TAXO);
    
    var query = 'SELECT espece FROM Espece WHERE id_Espece =\'' + id + '\';';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            // console.log("animal", res);
            
            c.end();
            callback(null, res);
        }
    });
}
exports.getCommentFromMissionId = function (id, callback) {
    var c = init(process.env.B_MISSION);
    
    var query = 'SELECT commentaires FROM Missions WHERE id_Mission =\'' + id + '\';';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            // console.log("animal", res);
            
            c.end();
            callback(null, res);
        }
    });
}

exports.getAnimals = function (callback) {
    var c = init(process.env.B_TAXO);
    
    var query = 'SELECT espece, id_Espece FROM Espece;';
    //console.log(query);
    c.query(query, function (err, res) {
        if (err) {
            c.end();
            callback(err, null);
        } else {
            c.end();
            callback(null, res);
        }
    });
}