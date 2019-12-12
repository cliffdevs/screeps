const { Brain } = require("./brain");
const { MemoryCleaner } = require("./util/memory-cleaner");
const memoryCleaner = new MemoryCleaner();
let brain = new Brain(memoryCleaner);

const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  brain.loop();
};

/**
 * Constructor function for the Main module
 * @param {Brain} brainInput
 */
const build = (brainInput) => {
  brain = brainInput;
  return { loop };
};

module.exports = {
  build,
  loop
}