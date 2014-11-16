require("./account");
require("./rooms");
require("./game");

module.exports = function(app){
  var accountRouter = new AccountRouter(app);
  var gameRouter = new GameRouter(app);

  var randomUserName = "Anonymous" + Math.floor(Math.random() * 2000 + 1000);

	app.get('/', function(req, res){
	  res.render('home/index',{
      userName: randomUserName
    });
	});



};