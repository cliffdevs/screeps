/**
 * Module responsible for cleaning out unused memory references.
 */
class MemoryCleaner {
    /**
     * Searches for the names of dead creeps in memory structures and removes them
     * to reclaim those valuable memory bytes.
     */
    purge() {
        for (const creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName];
            }
        }
        return;
    }
}

module.exports = {
    MemoryCleaner
};