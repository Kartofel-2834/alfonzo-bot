// SucMiBol
// greeniaw

const config = require("./config.js");

const mineflayer = require("mineflayer");
const mcdata = require("minecraft-data")(config.bot.version);
const bot = mineflayer.createBot(config.bot);

const { pathfinder } = require("mineflayer-pathfinder");
const { Movements } = require("mineflayer-pathfinder");

const listeners = require("./listeners/index");
const loops = require("./loops/index");

async function main() {
  bot.loadPlugin(pathfinder);

  const state = {
    priority: 0,
    stopped: { lastPosition: null, repeats: 0 },
    blacklist: new Set(),
  };

  const updateState = (field, v) => (state[field] = v);

  // Set listeners
  for (const listener in listeners) {
    bot.on(listener, function () {
      const args = Array.from(arguments);
      listeners[listener].bind(bot)(...args, state, updateState);
    });
  }

  // Set loop
  bot.once("spawn", () => {
    const moves = new Movements(bot, mcdata);

    moves.canOpenDoors = true;

    bot.pathfinder.setMovements(moves);

    const mainLoop = setInterval(() => {
      for (const loop in loops) {
        loops[loop].bind(bot)(state, updateState);
      }
    }, 1000);
  });
}

main();
