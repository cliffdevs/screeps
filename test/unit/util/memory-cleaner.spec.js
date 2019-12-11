const { expect } = require("chai");
const { MemoryCleaner } = require("../../../src/util/memory-cleaner");
const { Game, getFakeCreep, Memory } = require("../mock");
const _ = require("lodash");

describe("MemoryCleaner", () => {
  let memoryCleaner;

  beforeEach(() => {
    // @ts-ignore
    global.Game = _.clone(Game);
    // @ts-ignore
    global.Memory = _.clone(Memory);

    memoryCleaner = new MemoryCleaner();
  });

  it("should remove creeps from memory when they are no longer alive in the game", () => {
    const creep1 = getFakeCreep();
    const creep2 = getFakeCreep();

    // given
    // @ts-ignore
    global.Game.creeps = {
      creep2
    };

    // @ts-ignore
    global.Memory.creeps = {
      creep1,
      creep2
    };

    // when
    memoryCleaner.purge();

    // then
    expect(global.Memory.creeps).to.not.haveOwnProperty("creep1");
    expect(global.Memory.creeps.creep2).to.not.be.undefined;
  });
});
