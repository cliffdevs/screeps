const spawner = require("spawner");

const MAX_UNITS = 6;
const PARTS = [WORK, CARRY, CARRY, MOVE, MOVE];
const ROLE = "harvester";

const spawn = ({ spawnerName, energySource }) => {
  const spawnCommand = {
    spawnerName: spawnerName,
    role: ROLE,
    maxTypeOfRole: MAX_UNITS,
    roleParts: PARTS,
    energySource: energySource
  };
  spawner.spawn(spawnCommand);
};

module.exports = {
  spawn
};
