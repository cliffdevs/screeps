const spawner = require("spawner");

const MAX_UNITS = 4;
const PARTS = [
  WORK,
  // WORK,
  // WORK,
  // WORK,
  // WORK,
  // WORK,
  // WORK,
  // WORK,
  // CARRY,
  // CARRY,
  // CARRY,
  // CARRY,
  // CARRY,
  // CARRY,
  CARRY,
  CARRY,
  MOVE,
  MOVE
];
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
