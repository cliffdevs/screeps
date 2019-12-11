const purge = () => {
  for (var name in Memory.creeps) {
    if (Memory.creeps[name] && !Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log("Clearing non-existing creep memory:", name);
    }
  }
  for (var room in Memory.rooms) {
    if (room.claimer && !Game.creeps[room.claimer]) {
      delete room.claimer;
      console.log("Clearing non-existing claimer from room memory");
    } else if (room.attackers) {
      for (var attacker in room.attackers) {
        if (!Game.creeps[attacker.name]) {
          //   delete room.attackers[attacker.name];
          delete Memory.rooms[room.name].attackers[attacker.name];
        }
      }
    }
  }
};

module.exports = {
  purge
};
