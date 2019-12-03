const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
const builderSpawner = require("spawn.builder");
const maxharvesterSpawner = require("spawn.maxharvester");
const upgraderSpawner = require("spawn.upgrader");
const creepCleaner = require("memory.creepcleaner");
const towerManager = require("towers");
const locationUtils = require("utils.locate");

module.exports.loop = function() {
  creepCleaner.purge();

  for (var spawnerName in Game.spawns) {
    const spawner = Game.spawns[spawnerName];
    console.log(
      "Now updating area for spawner " + spawnerName + ":" + spawner.id
    );

    const previousSourceId =
      Memory[spawner.room.name].previousSpawnEnergySource;
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
      maxharvesterSpawner.spawn(spawnerInput);
      upgraderSpawner.spawn(spawnerInput);

      if (locationUtils.findThingsToBuild(spawner.room).length > 0) {
        builderSpawner.spawn(spawnerInput);
      }
    } catch (error) {
      console.log(error.message);
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
      if (creep.memory.role == "upgrader") {
        roleUpgrader.run(creep);
      }
      if (creep.memory.role == "builder") {
        roleBuilder.run(creep);
      }
    });

    towerManager.run(spawner.room);
  }
};
