var underscore = require("underscore");

var userSocketTable = [];

module.exports = UserSocket = function(io, socket){
    this.getUserFromSocket = function(socketId){
      var item = underscore.findWhere(userSocketTable,{"socketId": socketId});
      if(item !== undefined){
        return item.userId;
      }else{
        return undefined;
      }
    }

    this.getSocketFromUser = function(userId){
      var item = underscore.findWhere(userSocketTable,{"userId": userId});
      if(item !== undefined){
        return item.socketId;
      }else{
        return undefined;
      }
    }

    socket.on('user:bindUserToSocket', function(userId){
      userSocketTable.push({
        "socketId": socket.id,
        "userId": userId}
      );

      //console.log("add: " + userSocketTable.length);
    });

    this.unbindUser = function(socketId){
      for(var i = 0; i < userSocketTable.length; i++){
        if(userSocketTable[i].socketId == socketId){
          userSocketTable.splice(i, 1);
        }
      }

      //console.log("user:: " + userSocketTable.length);
    }

}