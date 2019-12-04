// const creepMover = require("nav.pathfinder");

/**
 *
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags["Attack"];
  if (flag) {
    if (creep) {
      if (creep.pos.roomName === flag.pos.roomName) {
        let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
        let outcome = creep.attack(spawn);
        if (outcome === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      } else {
        creep.moveTo(flag);
      }
    }
  }
};
module.exports = {
  run
};
