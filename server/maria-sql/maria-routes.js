var express = require('express'),
maria  = require('./maria-query');

var app = module.exports = express.Router();

app.get('/maria/users', function(req, res) {
  maria.getUsers(function(err, data){
    if(err){ 
      console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    }
    else{
      console.log('Request : SELECT * FROM USER_TABLE :: OK');
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
      console.log('Request : Create user :: ERROR : ', err);
      res.status(400).send(str).end();
    }
    else{
      console.log('Request : Create user :: OK', data);
      res.status(200).send(data).end();
    }
  });
});

app.post('/signin', function(req, res) {
  maria.verifyUser(req.body, function(err, data){
    if(err){ 
      console.log('Request : Verify user :: ERROR', err);
      res.status(400).send(err).end();
    }
    else{
      
      console.log('Request : Verify user :: OK\n data : ', data);
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