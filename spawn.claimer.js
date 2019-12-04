const spawner = require("spawner");

const MAX_UNITS = 1;
const PARTS = [MOVE, MOVE, CLAIM, CLAIM];
const ROLE = "claimer";

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
