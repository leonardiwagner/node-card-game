module.exports = function(app){

	app.get('/', function(req, res){
	  res.sendfile('register.html');
	});

	app.get('/account/register', function(req, res){
	  res.sendfile('register.html');
	});

	app.post('/account/register', function(req, res){
	  
	});

	app.get('/account/:id', function(req, res){
	  var accountId = req.params.id;
	});

	app.get('/account/login', function(req, res){
	  
	});

	app.get('/rooms', function(req, res){
	  
	});

	app.get('/room:id', function(req, res){
	  var roomId = req.params.id;
	});

};