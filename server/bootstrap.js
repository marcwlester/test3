Meteor.startup(function () {
  // code to run on server at startup
  return Players.find();
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    console.log(user._id);
    // id just came online
    var player = findPlayer(user._id);
    console.log(player);
    if (player) {
      setPlayerActive(player, true);
    } else {
      createPlayer(user, {
        pos: {x:0,y:0}
      });
      console.log('player added');
    }
  },
  removed: function(user) {
    var player = findPlayer(user._id);
    if (player) {
      setPlayerActive(player, false);
    }
  }
});

function findPlayer(id)
{
  return Players.findOne({userId: id});
}

function createPlayer(user, playerData)
{
  Players.insert({
    userId: user._id,
    username: user.username,
    playerData: playerData,
    active: true
  });
}

function setPlayerActive(player, active)
{
    Players.update(player._id, {
      $set: {active: active}
    });
}
