// const creepMover = require("nav.pathfinder");

/**
 *
 * @param {Creep} creep
 */
const run = creep => {
  const flag = Game.flags["Attack"];
  if (flag) {
    if (creep) {
      Memory.rooms = Memory.rooms ? Memory.rooms : {};
      Memory.rooms[flag.pos.roomName] = Memory.rooms[flag.pos.roomName]
        ? Memory.rooms[flag.pos.roomName]
        : {};
      Memory.rooms[flag.pos.roomName].attackers =
        Memory.rooms[flag.pos.roomName].attackers || [];
      if (!Memory.rooms[flag.pos.roomName].attackers.includes(creep.name)) {
        Memory.rooms[flag.pos.roomName].attackers.push(creep.name);
      }
      if (creep.room.name === flag.pos.roomName) {
        let spawn = creep.room.find(FIND_HOSTILE_SPAWNS)[0];
        // let spawn = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: struct => struct.structureType === STRUCTURE_TOWER})
        let outcome = creep.attack(spawn);
        if (outcome == ERR_NOT_IN_RANGE) {
          const moveResult = creep.moveTo(spawn);
          // creepMover.moveCreepTo(creep, spawn);
          creep.say(moveResult);
        }
      } else {
        creep.moveTo(flag);
        // creepMover.moveCreepTo(creep, flag);
      }
    }
  }
};
module.exports = {
  run
};
