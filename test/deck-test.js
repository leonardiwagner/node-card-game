var assert = require('chai').assert;
var deckClass = require('../deck.js');

it('deck should have 32 cards', function(done){
  var deck = new deckClass.Deck();

  assert.equal(32, deck.getCards().length);
  done();
});

it('get 3 cards from deck', function(done){
  var deck = new deckClass.Deck();
  var cards = deck.getCard(3);

  assert.equal(3, cards.length);
  assert.equal(32 - 3, deck.getCards().length);
  done();
});