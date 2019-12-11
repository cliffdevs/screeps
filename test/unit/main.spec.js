const { assert } = require("chai");
const sinon = require("sinon");
const { build } = require("../../src/main");
const { Game, Memory } = require("./mock");
const _ = require("lodash");

describe("main", () => {
  let main;
  let mockBrain;

  beforeEach(() => {
    global.Game = _.clone(Game);
    global.Memory = _.clone(Memory);

    mockBrain = {
      loop: sinon.spy()
    };
    main = build(mockBrain);
  });

  it("should export a loop function", () => {
    assert.isTrue(typeof main.loop === "function");
  });

  it("should return void when called with no context", () => {
    assert.isUndefined(main.loop());
  });

  it("should execute the brain loop", () => {
    main.loop();
    assert.isTrue(mockBrain.loop.called);
  });
});
import { assert } from "chai";
import sinon from "sinon";
import { build, Main } from "../../src/main";
import { Game, Memory } from "./mock";

describe("main", () => {
  let main: Main;
  let mockBrain: any;

  beforeEach(() => {
    global.Game = _.clone(Game);
    global.Memory = _.clone(Memory);

    mockBrain = {
      loop: sinon.spy()
    };
    main = build(mockBrain);
  });

  it("should export a loop function", () => {
    assert.isTrue(typeof main.loop === "function");
  });

  it("should return void when called with no context", () => {
    assert.isUndefined(main.loop());
  });

  it("should execute the brain loop", () => {
    main.loop();
    assert.isTrue(mockBrain.loop.called);
  });
});
