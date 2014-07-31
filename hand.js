Hand = function(pPlayer){

  var MAX_CARDS_IN_HAND = 3;
  this.player = pPlayer;
  this.cards = Array();

  addCard = function(pCard){
    if(this.cards.length < MAX_CARDS_IN_HAND){
      this.cards.push(pCard);
    }else{
      //threw exception
    }

  };

};