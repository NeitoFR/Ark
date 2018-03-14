"use strict"
//require
var express = require('express'),
bodyParser = require('body-parser'),
session = require('express-session'),
path = require('path');
//Conf const
const _port = 3000;
//Session
var sess = null;
//Server
var app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/..', 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:"azerty", resave:false, saveUninitialized:true}));
//Routing
app.get('/', function (req, res){
    if(req.session.username)
    {
        res.send();
    }
    res.sendFile('../public/index.html', {root: __dirname});

    console.log(req.url);
})
.get('/view*', function (req, res){
    //var url = req.url.substring(1, req.url.length)+'.html';
    //res.sendFile('../public/src/my-'+url, {root: __dirname});
    res.writeHead(302, {'Location': '/'});
    res.end();
    console.log(req.url);
})
.post('/login', function(req, res){
    //Build Session
    //Getting data
    console.log("received data : ", req.body);
    //console.log("user received : ", req.body.username);
    //console.log("pwd received : ", req.body.password);
    //DB Checking
    
    //Answer
    //res.writeHead(302, {'Location': '/'});
    //res.write({user: req.body.user})
    //res.detail.response = "belette";
    res.send("Login OK");
    res.end();
})

//Binding server to port
.listen(_port, function (){
    console.log('Server listening on  : '+_port);
});