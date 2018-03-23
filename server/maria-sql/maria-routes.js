var express = require('express'),
maria  = require('./maria-query');

var app = module.exports = express.Router();

app.get('/maria/users', function(req, res) {
  maria.getUsers(function(err, data){
    if(err){ 
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
//Authentication related route
app.post('/signup', function(req, res) {
  maria.createUser(req.body, function(err, data){
    if(err){ 
      var str = '';
      switch (err.code) {
        case 1062:
        str = 'Username already taken';
        break;
        case 1406:
        str = 'Username or password too long';
        break;
        default:
        str = 'Unexpected error code : '+err.code;
        break;
      }
      //console.log('Request : Create user :: ERROR : ', err);
      res.status(400).send(str).end();
    }
    else{
      //console.log('Request : Create user :: OK', data);
      res.status(200).send(data).end();
    }
  });
});
app.post('/signin', function(req, res) {
  maria.verifyUser(req.body, function(err, data){
    if(err){ 
      //console.log('Request : Verify user :: ERROR', err);
      res.status(400).send(err).end();
    }
    else{
      
      //console.log('Request : Verify user :: OK\n data : ', data);
      if(data.info.numRows == 0)
      {
        res.status(201).send('Username or password incorrect').end();
      }
      if(data.info.numRows == 1)
      {
        res.status(200).send(data).end();
      }
    }
  });
});
app.post('/add-comment', function(req, res){
  //console.log('comment : ', req.body[Object.keys(req.body)[0]]);
  //console.log('user : ', Object.keys(req.body)[0]);
  maria.addComment(req.body, function(err, data){
    if(err){ 
      //console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    }
    else
    {//console.log('Request : Update commentaire :: OK');
      //res.status(200).send('Commentaire ajouté').end();
      res.status(204).send(data).end();
    }
  });
});
app.get('/get-comments', function(req, res) {
  maria.getCommentThread(function(err, data){
    if(err){ 
      //console.log('Request : SELECT commentaire :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      //console.log('Request : SELECT commentaire :: OK');
      var str = Object.values(data[0]);
      //console.log('thread', str[0]);
      res.send(str[0]).end();
    }
  });
});
app.get('/maria/alert-status-0', function(req, res) {
  maria.getAlertByStatus(0, function(err, data){
    if(err){ 
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
app.get('/maria/alert-status-1', function(req, res) {
  maria.getAlertByStatus(1, function(err, data){
    if(err){
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});