const REFRESH_INTERVAL = 100;

const findImportantStructures = (roomName) => {
    Memory.rooms = Memory.rooms || {};
    Memory.rooms[roomName] = Memory.rooms[roomName] || {};
    if (!Memory.rooms[roomName].importantStructures) {
        Memory.rooms[roomName].importantStructures = {};
        Memory.rooms[roomName].importantStructures.energySources = {};
        Game.rooms[roomName].find(FIND_SOURCES).forEach(source => {
            Memory.rooms[roomName].importantStructures.energySources[source.id] = {};
        });
    }
}

Room.prototype.execute = function () {
    findImportantStructures(this.name);
}
