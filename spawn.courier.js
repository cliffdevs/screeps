const spawner = require("spawner");

const MAX_UNITS = 4;
const PARTS = [
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  MOVE,
  CARRY,
  CARRY,
  CARRY,
  CARRY,
  CARRY,
  CARRY
];
const ROLE = "courier";

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
