var cardClass = require('./card.js');

exports.Deck = function(){
  var cardFamilies = [0, 1, 2, 3];
  var cardPeople = [0, 1, 2, 3, 4, 5, 6, 7];
  this.cards = Array();

  for(var f = 0; f < cardFamilies.length; f++){
    for(var p = 0; p < cardPeople.length; p++){
      this.cards.push(new Card(cardFamilies[f], cardPeople[p]));
    }
  }

  this.shuffleCards = function(){
    this.cards = shuffleArray(this.cards);
  };

  this.getCard = function(pQuantity){
    if(pQuantity > this.cards.length){
      throw "You're trying to get more cards than deck has";
    }

    var cardsToReturn = Array();
    for(var i = 0; i < pQuantity; i++){
      cardsToReturn.push(this.cards[i]);
    }
    
    this.cards.splice(0 ,pQuantity);

    return cardsToReturn;
  };

  this.getCards = function(){
    return this.cards;
  };

  //+ Jonas Raoni Soares Silva
  //@ http://jsfromhell.com/array/shuffle [v1.0]
  function shuffleArray(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }
};