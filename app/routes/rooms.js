
module.exports = RoomsRouter = function(app){
  app.get('/room', function(req, res){
    //var roomId = req.query.id;

    
    
    res.sendfile('./app/views/room/rooms.html');
  });
};

