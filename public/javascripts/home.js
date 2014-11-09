function bindUserCount(htmlElement, socket){

  socket.on('UPDATE_USER_COUNT', function(userCount){
    var message = "Oh there is no one here :(";
    if(userCount == 1){
      message = "Welcome! you're the only one here, invite your friends to play!";
    }else if(userCount > 1){
      message = "Users online: " + userCount;
    }

    $(htmlElement).html(message);
  });
}