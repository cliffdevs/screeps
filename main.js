const roleHarvester = require("role.harvester");
const roleMaxHarvester = require("role.maxharvester");
const roleRemoteMiner = require("role.remoteminer");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const roleAttacker = require("role.attacker");
const roleClaimer = require("role.claimer");
const roleRecycler = require("role.recycler");
const roleCourier = require("role.courier");
const builderSpawner = require("spawn.builder");
const harvesterSpawner = require("spawn.harvester");
const maxharvesterSpawner = require("spawn.maxharvester");
const upgraderSpawner = require("spawn.upgrader");
const remoteMinerSpawner = require("spawn.remoteminer");
const attackerSpawner = require("spawn.attacker");
const claimerSpawner = require("spawn.claimer");
const courierSpawner = require("spawn.courier");
const creepCleaner = require("memory.creepcleaner");
const towerManager = require("towers");
const locationUtils = require("utils.locate");
const creepUtils = require("util.creeps");

module.exports.loop = function() {
  creepCleaner.purge();

  _.filter(
    Game.creeps,
    creep =>
      creep.memory.role === "claimer" ||
      creep.memory.role === "attacker" ||
      creep.memory.role === "recycler"
  ).forEach(creep => {
    if (creep.memory.role === "attacker") {
      roleAttacker.run(creep);
    }
    if (creep.memory.role === "claimer") {
      roleClaimer.run(creep);
    }
    if (creep.memory.role === "recycler") {
      roleRecycler.run(creep);
    }
  });

  for (var spawnerName in Game.spawns) {
    const spawner = Game.spawns[spawnerName];
    console.log(
      "Now updating area for spawner " + spawnerName + ":" + spawner.id
    );

    Memory.rooms = Memory.rooms || {};
    Memory.rooms[spawner.room.name] = Memory.rooms[spawner.room.name] || {};
    const previousSourceId =
      Memory.rooms[spawner.room.name].previousSpawnEnergySource;
    const sourcesNotPrevious = spawner.room.find(FIND_SOURCES, {
      filter: source => {
        return source.id !== previousSourceId;
      }
    });
    const sourceId =
      sourcesNotPrevious && sourcesNotPrevious.length > 0
        ? sourcesNotPrevious[0].id
        : previousSourceId;

    const spawnerInput = {
      spawnerName: spawnerName,
      energySource: sourceId
    };

    try {
      const creepsInRoom = creepUtils.getCreepsByRoomName(spawner.room.name);

      const maxHarvesterCount = _.filter(
        creepsInRoom,
        creep => creep.memory.role === "maxharvester"
      ).length;

      const courierCount = _.filter(
        creepsInRoom,
        creep => creep.memory.role === "courier"
      ).length;

      const containersWithEnergy = spawner.room.find(FIND_STRUCTURES, {
        filter: struct =>
          struct.structureType === STRUCTURE_CONTAINER &&
          struct.store[RESOURCE_ENERGY] > 0
      }).length;

      const attackersCount = _.filter(
        creepsInRoom,
        creep => creep.memory.role === "attacker"
      ).length;

      if (maxHarvesterCount === 0 || courierCount === 0) {
        harvesterSpawner.spawn(spawnerInput);
      }

      if (courierCount >= 2 * maxHarvesterCount) {
        maxharvesterSpawner.spawn(spawnerInput);
      }
      if (maxHarvesterCount > 0) {
        courierSpawner.spawn(spawnerInput);
      }

      if (containersWithEnergy > 0) {
        upgraderSpawner.spawn(spawnerInput);
      }

      if (
        locationUtils.findThingsToBuild(spawner.room).length > 0 &&
        containersWithEnergy > 0
      ) {
        builderSpawner.spawn(spawnerInput);
      }

      // todo find closest spawn from attack / claim flag
      if (Game.flags["Attack"]) {
        Memory.rooms = Memory.rooms ? Memory.rooms : {};
        Memory.rooms[Game.flags["Attack"].pos.roomName] = Memory.rooms[Game.flags["Attack"].pos.roomName]
          ? Memory.rooms[Game.flags["Attack"].pos.roomName]
          : {};
        Memory.rooms[Game.flags["Attack"].pos.roomName].attackers =
          Memory.rooms[Game.flags["Attack"].pos.roomName].attackers || [];
        if (Memory.rooms[Game.flags["Attack"].pos.roomName].attackers.length < 10) {
          attackerSpawner.spawn(spawnerInput);
        }
      }

      if (
        Game.flags["Claim"] &&
        (!Memory.rooms ||
          !Memory.rooms[Game.flags["Claim"].pos.roomName] ||
          !Memory.rooms[Game.flags["Claim"].pos.roomName].claimer)
      ) {
        console.log("spawning claimer...");
        claimerSpawner.spawn(spawnerInput);
      }

      if (Game.flags["Mine"]) {
        Memory.rooms = Memory.rooms ? Memory.rooms : {};
        Memory.rooms[Game.flags["Mine"].pos.roomName] = Memory.rooms[Game.flags["Mine"].pos.roomName]
          ? Memory.rooms[Game.flags["Mine"].pos.roomName]
          : {};
        Memory.rooms[Game.flags["Mine"].pos.roomName].miners =
          Memory.rooms[Game.flags["Mine"].pos.roomName].miners || [];
        if (Memory.rooms[Game.flags["Mine"].pos.roomName].miners.length < 10) {
          remoteMinerSpawner.spawn(spawnerInput);
        }
      }
    } catch (error) {
      console.log(error);
    }

    if (spawner.spawning) {
      const spawningCreep = Game.creeps[spawner.spawning.name];
      spawner.room.visual.text(
        "🛠️" + spawningCreep.memory.role,
        spawner.pos.x + 1,
        spawner.pos.y,
        { align: "left", opacity: 0.8 }
      );
    }

    spawner.room.find(FIND_MY_CREEPS).forEach(creep => {
      if (creep.memory.role == "harvester") {
        roleHarvester.run(creep);
      }
      if (creep.memory.role == "maxharvester") {
        roleMaxHarvester.run(creep);
      }
      if (creep.memory.role == "upgrader") {
        roleUpgrader.run(creep);
      }
      if (creep.memory.role == "builder") {
        roleBuilder.run(creep);
      }
      if (creep.memory.role == "courier") {
        roleCourier.run(creep);
      }
    });

    towerManager.run(spawner.room);
  }
};
