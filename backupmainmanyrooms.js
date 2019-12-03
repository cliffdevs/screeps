const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const builderSpawner = require('spawn.builder');
const harvesterSpawner = require('spawn.harvester');
const maxharvesterSpawner = require('spawn.maxharvester');
const upgraderSpawner = require('spawn.upgrader');
const creepCleaner = require('memory.creepcleaner');

module.exports.loop = function () {
    creepCleaner.purge();
 
    for (var spawnerName in Game.spawns) {
        const spawner = Game.spawns[spawnerName];
        console.log('Now updating area for spawner ' + spawnerName + ':' + spawner.id);
        
        const spawnerInput = {
            spawnerName: spawnerName
        };
        
        // spawn per resource in the room
        
        // harvesterSpawner.spawn(spawnerInput)
        maxharvesterSpawner.spawn(spawnerInput);
        upgraderSpawner.spawn(spawnerInput);
        builderSpawner.spawn(spawnerInput);
        
        if(spawner.spawning) { 
            var spawningCreep = Game.creeps[spawner.spawning.name];
            spawner.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawner.pos.x + 1, 
                spawner.pos.y, 
                {align: 'left', opacity: 0.8});
        }
        
        spawner.room.find(FIND_CREEPS).forEach((creep) => {
            console.log('Updating creep ' + creep.name + ':' + creep.id);
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        });
    }
}