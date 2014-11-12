module.exports = AccountRouter = function(app){
  app.get('/register', function(req, res){
    var roomId = req.query.id;
    
    res.render('account/register');
  });

  app.get('/login', function(req, res){
    var roomId = req.query.id;
    
    res.sendfile('./app/views/account/login.html');
  });
};