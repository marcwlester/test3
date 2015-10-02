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
