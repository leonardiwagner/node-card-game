var assert = require('chai').assert;
var teamClass = require('../team.js');
var playerClass = require('../player.js');

it('add players to a team', function(done){
  var team = new teamClass.Team(1);
  team.addPlayer(new playerClass.Player(32,"John"));
  team.addPlayer(new playerClass.Player(93,"Gabriel"));

  assert.equal(2, team.getPlayers().length);
  done();
});

it('add points to a team', function(done){
  var team = new teamClass.Team(1);
  team.addPoints(5);

  assert.equal(5, team.getPoints());
  done();
});