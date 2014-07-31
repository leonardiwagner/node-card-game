var assert = require('chai').assert;
var playerClass = require('../player.js');

it('player set team', function(done){
  var player = new playerClass.Player();

  player.setTeam(2);
  assert.equal(2, player.getTeam());
  done();
});