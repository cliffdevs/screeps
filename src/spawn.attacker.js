const spawner = require("spawner");

const MAX_UNITS = 1;
const PARTS = [
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
  TOUGH,
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
  // ATTACK,
  // ATTACK,
  // ATTACK,
  // ATTACK,
  // ATTACK,
  // ATTACK,
  // ATTACK,
  ATTACK,
  ATTACK,
  ATTACK
];
const ROLE = "attacker";

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
