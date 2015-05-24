"use strict";

module.exports = function(app){
  var randomUserName = "Anonymous" + Math.floor(Math.random() * 2000 + 1000);

	app.get('/', function(req, res){
	  res.render('home/index',{
      userName: randomUserName
    });
	});

  app.get('/room', function(req, res){
    res.render('room/index',{
      roomId: req.query.id
    });
  });
};