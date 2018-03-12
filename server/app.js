"use strict"
//require
var express = require('express'),
path = require('path');
//Conf const
const _port = 3000;

//Server
var app = express();

//Middleware
app.use(express.static(path.join(__dirname, '/..', 'public')));

//Routing
app.get('/', function (req, res){
    res.sendFile('../public/index.html', {root: __dirname});
    console.log(req.url);
})
app.get('/view*', function (req, res){
    //var url = req.url.substring(1, req.url.length)+'.html';
    //res.sendFile('../public/src/my-'+url, {root: __dirname});
    res.writeHead(302, {'Location': '/'});
    res.end();
    console.log(req.url);
})
.listen(_port, function (){
    console.log('Server listening on : '+_port);
});