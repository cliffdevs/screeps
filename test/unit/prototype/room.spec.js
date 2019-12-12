const { expect } = require("chai");
const { Game, Memory, Room } = require("../mock");
const { stub } = require("sinon");
const _ = require("lodash");

describe("room", () => {
    let room;

    beforeEach(() => {
        global.Game = _.clone(Game);
        global.Memory = _.clone(Memory);
        global.Room = Room;
        require("../../../src/prototype/room");
        room = new Room();
        room.name = 'E18S34';
    })

    it("should have an execute method", () => {
        expect(room.execute).to.be.a("function");
    });

    it("should store important structures in room memory", () => {
        const source1 = { id: '12345' };
        const source2 = { id: '54321' };

        const find = stub();
        find.returns([
            source1,
            source2
        ]);
        global.Room.prototype.find = find;

        room.execute();

        expect(global.Memory.rooms[room.name].importantStructures.energySources[source1.id]).to.be.an("object");
        expect(global.Memory.rooms[room.name].importantStructures.energySources[source2.id]).to.be.an("object");
    });
});
