/**
 *
 * @param {Room} room
 */
const findThingsToRepair = room => {
  const MIN_WALL_HEALTH = 5000;
  return room.find(FIND_STRUCTURES, {
    filter: object => {
      return (
        (object.structureType == STRUCTURE_ROAD &&
          object.hits < object.hitsMax / 3) ||
        (object.structureType == STRUCTURE_CONTAINER &&
          object.hits < object.hitsMax / 3) ||
        (object.structureType == STRUCTURE_WALL &&
          object.hits < MIN_WALL_HEALTH) ||
        (object.structureType == STRUCTURE_RAMPART &&
          object.hits < MIN_WALL_HEALTH)
      );
    }
  });
};

/**
 *
 * @param {Room} room
 */
const findThingsToBuild = room => {
  return room.find(FIND_CONSTRUCTION_SITES);
};

module.exports = {
  findThingsToBuild,
  findThingsToRepair
};
