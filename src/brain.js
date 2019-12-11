import { MemoryCleaner } from "./utils/memory-cleaner";

/**
 * All AI Logic starts here.
 */
export class Brain {
  memoryCleaner;

  /**
   * Conscuctor for Brain
   * @param {MemoryCleaner} memoryCleaner
   */
  constructor(memoryCleaner) {
    this.memoryCleaner = memoryCleaner;
  }

  /**
   * Execute the loop-ly logic cycle
   */
  loop() {
    if (this.isCpuBelowLimit()) {
      this.cleanMemory();
      Memory.time = Game.time;
      for (const roomName in Game.rooms) {
        Game.rooms[roomName].execute();
      }
    }
    return;
  }

  cleanMemory() {
    this.memoryCleaner.purge();
  }

  isCpuBelowLimit() {
    if (Game.time > 1000 && Game.cpu.bucket < 2 * Game.cpu.tickLimit && Game.cpu.bucket < Game.cpu.limit * 10) {
      console.log(
        `${Game.time} Skipping tick CPU Bucket too low. bucket: ${Game.cpu.bucket} tickLimit: ${Game.cpu.tickLimit} limit: ${Game.cpu.limit}`
      );
      return false;
    }

    return true;
  }
}
