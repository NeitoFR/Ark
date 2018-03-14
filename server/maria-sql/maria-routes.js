var express = require('express'),
    quoter  = require('./maria');

var app = module.exports = express.Router();

app.get('/maria/users', function(req, res) {
  res.status(200).send(quoter.getUsers());
});
