const { expect } = require("chai");
const { Game, Memory, Room } = require("../mock");
const sinon = require("sinon");
const _ = require("lodash");

describe("room", () => {

    beforeEach(() => {
        global.Game = _.clone(Game);
        global.Memory = _.clone(Memory);
        global.FIND_SOURCES = 123;
        global.Room = Room;
        require("../../../src/prototype/room");
    });

    it("should have an execute method", () => {
        const room = new Room();
        expect(room.execute).to.be.a("function");
    });

    it("should store important structures in room memory", () => {
        const source1 = { id: '12345' };
        const source2 = { id: '54321' };
        sinon.replace(global.Room.prototype, 'find', () => ([
            source1,
            source2
        ]));
        const room = new Room('E18S34');
        global.Game.rooms[room.name] = room;
        room.execute();

        expect(global.Memory.rooms[room.name].importantStructures.energySources[source1.id]).to.be.an("object");
        expect(global.Memory.rooms[room.name].importantStructures.energySources[source2.id]).to.be.an("object");
    });
});
