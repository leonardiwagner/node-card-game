
module.exports = AccountRouter = function(app){
  app.get('/room', function(req, res){
    var roomId = req.query.id;
    //io.to('ROOM_' + roomId).emit("welcome to a specific room");
    console.log(roomId);
  });
};

