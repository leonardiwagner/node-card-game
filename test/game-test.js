var assert = require('chai').assert;
var gameClass = require('../game.js');
var teamClass = require('../team.js');
var playerClass = require('../player.js');

it('build a game', function(done){
  var team = new teamClass.Team(1);
  team.addPlayer(new playerClass.Player(32,"John"));
  team.addPlayer(new playerClass.Player(93,"Gabriel"));

  assert.equal(2, team.getPlayers().length);
  done();
});

