const { stub } = require("sinon");

const Game = {
  cpu: {
    bucket: 100,
    getUsed: () => 20,
    limit: 20,
    tickLimit: 20
  },
  creeps: {},
  rooms: {},
  spawns: {},
  time: 12345
};

const Memory = {
  creeps: {}
};

/**
 * Utility to get a fake creep quickly
 * @returns {Creep} fake creep
 */
const getFakeCreep = () => {
  return stub();
};

/**
 *
 * @param {string} id desired id of the room
 * @param {object} opts the method overrides
 */
const getFakeRoom = (name, opts) => {
  const room = stub(opts);
  room.name = name;
  return room;
};

class Room {
  constructor() {

  }
}

module.exports = {
  Game,
  Memory,
  Room,
  getFakeCreep,
  getFakeRoom
}