module.exports.Game = Game = function(){

  var that = this;

  this.distributeCards = function(){
    var deck = that.getDeck();
    deck = that.shuffleDeck(deck);

    return {
      player0: [deck[0], deck[1], deck[2]],
      player1: [deck[3], deck[4], deck[5]],
      tableCard: deck[6]
    };
  };

  this.getDeck = function(){
    var deck = [];
    for(var iValue = 0; iValue < 10; iValue++){
      for(var iFamily = 0; iFamily < 4; iFamily++){
        deck.push({
          "value": iValue,
          "family": iFamily
        });
      }
    }

    return deck;
  };

  this.shuffleDeck = function(deck){
    //http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
    for(var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
    return deck;
  };
  

  




};