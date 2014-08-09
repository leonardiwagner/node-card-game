module.exports.Player = Player = function(pId, pName, pTeam){
  this.id = pId;
  this.name = pName;
  this.team = pTeam;
  this.cards = null;

  this.setCards = function(pCards){
    this.cards = pCards;
  };

  this.getName = function(){
    return this.name;
  };

  this.getTeam = function(){
    return this.team;
  };

  this.getCards = function(){
    return this.cards;
  };

};