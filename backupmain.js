const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const builderSpawner = require('spawn.builder');
const harvesterSpawner = require('spawn.harvester');
const maxharvesterSpawner = require('spawn.maxharvester');
const upgraderSpawner = require('spawn.upgrader');
const creepCleaner = require('memory.creepcleaner');

const SPAWN_NAME = 'Spawn1';
const SPAWNER = { spawnerName: SPAWN_NAME };

module.exports.loop = function () {
    creepCleaner.purge();
    
    // Game.spawns.forEach((name) => {
    //     console.log(name + ':' + Game.spawns[name].id);
    // });
    for (var name in Game.spawns) {
        console.log('Now updating area for spawner ' + name + ':' + Game.spawns[name].id);
    }

    // harvesterSpawner.spawn(SPAWNER)
    maxharvesterSpawner.spawn(SPAWNER);
    upgraderSpawner.spawn(SPAWNER);
    builderSpawner.spawn(SPAWNER);
    
    
    if(Game.spawns[SPAWN_NAME].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[SPAWN_NAME].spawning.name];
        Game.spawns[SPAWN_NAME].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[SPAWN_NAME].pos.x + 1, 
            Game.spawns[SPAWN_NAME].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}