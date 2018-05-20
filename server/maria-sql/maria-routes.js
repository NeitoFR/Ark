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
app.get('/maria/users/:id', function(req, res) {
  maria.getUserInfo(req.params.id, function(err, data){
    if(err){ 
      res.status(400).send(err).end();
    }
    else{
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
        str = 'pseudo already taken';
        break;
        case 1406:
        str = 'pseudo or password too long';
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
        res.status(201).send('pseudo or password incorrect').end();
      }
      if(data.info.numRows == 1)
      {
        res.status(200).send(data).end();
      }
    }
  });
});
app.post('/maria/add-comment', function(req, res){
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
app.get('/maria/get-comments/:id', function(req, res) {
  maria.getCommentThread(req.params.id, function(err, data){
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
app.post('/missions/get', function(req, res) {
  //console.log("body", req.body.wanted);
  
  maria.getAlerts(req.body.wanted, function(err, data){
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
app.get('/missions/alert-status-1', function(req, res) {
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
app.post('/maria/create-alert', function(req, res){
  //console.log(req.body);
  
  //console.log('comment : ', req.body[Object.keys(req.body)[0]]);
  //console.log('user : ', Object.keys(req.body)[0]);
  maria.createAlert(req.body, function(err, data){
    if(err){ 
      console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    }
    else
    {
      //console.log('Request : Update commentaire :: OK');
      //res.status(200).send('Commentaire ajouté').end();
      res.status(204).send(data).end();
    }
  });
});
app.post('/maria/submit-participation', function(req, res){
  console.log(req.body);
  
  maria.sumbitParticipation(req.body, function(err, data){
    if(err){ 
      //console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    }
    else
    {
      //console.log('Request : Update commentaire :: OK');
      res.status(204).send(data).end();
    }
  });
});
// app.get('/missions/:project_id', function(req, res) {
//   //console.log('url ', req.params);
//   maria.getAlertById(req.params.project_id, function(err, data){
//     if(err){
//       //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
//       res.status(400).send(err).end();
//     }
//     else{
//       //console.log('Request : SELECT * FROM USER_TABLE :: OK');
//       res.status(200).send(data).end();
//     }
//   });
// });
app.get('/missions/:project_id', function(req, res) {
  //console.log('url ', req.params);
  var result = [];
  maria.getAlertById(req.params.project_id, function(err, data){
    if(err){
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      // res.status(200).send(data).end();
      result.push(data);
      // console.log(data[0].id_Espece);
      
      maria.getEspece(data[0].id_Espece, function(err, data){
        if(err){
          //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
          res.status(400).send(err).end();
        }
        else{
          //console.log('Request : SELECT * FROM USER_TABLE :: OK');
          // console.log('animal ', data);
          
          result.push(data);
          res.status(200).send(result).end();
          
        }});
      }
    });
  });
  app.get('/comment/:id', function(req, res) {
    maria.getCommentFromMissionId(req.params.id, function(err, data){
      if(err){ 
        res.status(400).send(err).end();
      }
      else{
        res.status(200).send(data).end();
      }
    });
  });
  app.get('/maria/get-animals', function(req, res) {
    //console.log('url ', req.params);
    maria.getAnimals(function(err, data){
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