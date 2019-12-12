const REFRESH_INTERVAL = 100;

const findImportantStructures = () => {
    Memory.rooms = Memory.rooms || {};
    Memory.rooms[this.name] = Memory.rooms[this.name] || {};
    if (!Memory.rooms[this.name].importantStructures) {
        Memory.rooms[this.name].importantStructures = {};
        Memory.rooms[this.name].importantStructures.energySources = {};
        this.find(FIND_SOURCES).forEach(source => {
            Memory.rooms[this.name].importantStructures.energySources[source.id] = {};
        })
    }
}

Room.prototype.execute = () => {
    findImportantStructures();
}