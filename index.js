var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');


var router = require('./app/routes/router')(app);
var socketManager = require('./app/sockets/sockets')(http);

app.use(express.static(__dirname + "/public"));

app.set('views', './app/views');
app.set('view engine', 'ejs');



var port = process.env.PORT || 5000;
http.listen(port, function(){
  console.log('listening on *:' + port);
});