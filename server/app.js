"use strict"
//require
var express = require('express'),
bodyParser = require('body-parser'),
path = require('path');
//Populate process.env variable
require('dotenv').config();
const _port = 3000;
//Server
var app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routing
app.get('/', function (req, res){
    res.sendFile('../public/index.html', {root: __dirname});

    //console.log(req.url);
});
//SQL API Routing
app.use(require('./maria-sql/maria-routes'));

app.get('/*', function (req, res){
    //var url = req.url.substring(1, req.url.length)+'.html';
    //res.sendFile('../public/src/my-'+url, {root: __dirname});
    res.writeHead(302, {'Location': '/'});
    res.end();
    //console.log(req.url);
});

//Binding server to port
app.listen(process.env.APP_PORT, function (){
    console.log('Server listening on  : '+process.env.APP_PORT);
});