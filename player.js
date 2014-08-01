exports.Player = function(pId, pName){
  this.id = pId;
  this.name = pName;
  this.team = null;
  this.hand = null;

  this.getTeam = function(){
    return this.team;
  };

  this.setTeam = function(pTeam){
    this.team = pTeam;
  };

};