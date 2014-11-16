module.exports = GameRouter = function(app){
  
  app.get('/game', function(req, res){
    var roomId = req.query.roomId;
    
    res.render('game/index');
  });


};