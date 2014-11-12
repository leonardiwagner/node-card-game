require("./account");
require("./room");

module.exports = function(app){
  var accountRouter = new AccountRouter(app);

	app.get('/', function(req, res){
	  res.render('home/index');
	});



};