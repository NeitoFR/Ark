var express = require('express'),
    maria  = require('./maria');

var app = module.exports = express.Router();

app.get('/maria/users', function(req, res) {
  var resp = maria.getUsers(function(err, data){
    if(err){ 
      console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(201).send(err).end();
    }
    else{
      console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
  }
  });
});
