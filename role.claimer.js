// const creepMover = require("nav.pathfinder");

/**
 *
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags["Claim"];
  if (flag) {
    if (creep) {
      creep.say(creep.room.name);
      if (creep.room.name === flag.pos.roomName) {
        const controller = Game.rooms[flag.pos.roomName].find(FIND_STRUCTURES, {
          filter: struct => struct.structureType === STRUCTURE_CONTROLLER
        })[0];
        creep.say("attack!");
        const result = creep.attackController(controller);
        if (result == ERR_NOT_IN_RANGE) {
          creep.say("close in");
          const moveResult = creep.moveTo(controller);
          if (moveResult != OK) {
            console.log("attack move failed because " + moveResult);
          }
        } else if (result != OK) {
          console.log("attack controller failed because " + result);
        }
      } else {
        creep.say("deploy");
        creep.moveTo(flag);
      }
    }
  }
};
module.exports = {
  run
};
