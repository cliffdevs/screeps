import { Brain } from "brain";
import { MemoryCleaner } from "utils/memory-cleaner";
const memoryCleaner = new MemoryCleaner();
let brain = new Brain(memoryCleaner);

export const loop = () => {
  console.log(`Current game tick is ${Game.time}`);
  brain.loop();
};

/**
 * Constructor function for the Main module
 * @param {Brain} brainInput
 */
export const build = (brainInput) => {
  brain = brainInput;
  return { loop };
};
