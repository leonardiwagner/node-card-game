module.exports.Game = Game = function(pTeams){
  this.teams = pTeams;

  this.getTeams = function(){
    return this.teams;
  };

  this.orderedPlayers = function(){
    var result = Array();
    result.push(this.teams[0].getPlayers()[0]);
    result.push(this.teams[1].getPlayers()[0]);
  };

  this.getOrderedPlayers = function(){
    return this.orderedPlayers;
  };

  
};