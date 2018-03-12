"use strict"
//require
var express = require('express'),
path = require('path'),
//Conf const
const _port = 3000;

//Server
var app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/..', 'public')));

//Routing
app.get('/', function (req, res){
    res.sendFile('../public/index.html', {root: __dirname});
})
.listen(_port, function (){
    console.log('Server listening on : '+_port);
});