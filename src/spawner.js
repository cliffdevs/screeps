const creepUtils = require("util.creeps");

const spawn = ({
  spawnerName,
  role,
  maxTypeOfRole,
  roleParts,
  energySource
}) => {
  const roomName = Game.spawns[spawnerName].room.name;
  const creepsInRoom = creepUtils.getCreepsByRoomName(roomName);

  // this used to be Game.creeps
  const existingUnitsOfRole = _.filter(
    creepsInRoom,
    creep => creep.memory.role === role
  );
  console.log(role + "s: " + existingUnitsOfRole.length);

  if (existingUnitsOfRole.length < maxTypeOfRole) {
    const newName = role + Game.time;
    console.log("Spawning new " + role + ": " + newName);
    const spawnResult = Game.spawns[spawnerName].spawnCreep(
      roleParts,
      newName,
      {
        memory: {
          role,
          energySource
        }
      }
    );

    if (spawnResult == OK) {
      Memory.rooms = Memory.rooms || {};
      Memory.rooms[roomName] = Memory.rooms[roomName] || {};
      Memory.rooms[roomName].previousSpawnEnergySource = energySource;
    } else
      throw Error(
        "Unable to spawn a new " + role + " right now: " + spawnResult
      );
  }
};

module.exports = {
  spawn
};
