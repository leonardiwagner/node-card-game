module.exports.Play = Play = function(pGame){

  this.winningPlayer = null;
  this.winningCard = null;

  this.registerMove = function(pPlayer, pCard){
    if(this.winningPlayer === null && this.winningCard === null){
      this.winningPlayer = pPlayer;
      this.winningCard = pCard;
    }else{
      if(pCard.getValue() > this.winningCard.getValue()){
        this.winningPlayer = pPlayer;
        this.winningCard = pCard;
      }else if(pCard.getValue() === this.winningCard.getValue()){
        if(pCard.getFamily() > this.winningCard.getFamily()){
          this.winningPlayer = pPlayer;
          this.winningCard = pCard;
        }
      }
    }
  };

};