const config = require("../config.js");
const mcdata = require("minecraft-data")(config.bot.version);

const bingo = require("../utils/bingo");

function findMob(bot, target) {
  if (typeof target !== "string" || !bot?.entity?.position) return null;

  try {
    return bot.nearestEntity((entity) =>
      bingo(target, [entity.displayName, entity.name])
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

function findBlocks(bot, target, count = 1) {
  try {
    return bot.findBlocks({
      matching: (block) => bingo(target, [block.displayName, block.name]),
      maxDistance: 1000,
      count,
    });
  } catch (err) {
    console.log(err);
    return [];
  }
}

function find(bot, target) {
  if (typeof target !== "string") return null;

  const nameParsed = target.split(" ").join("_").toLowerCase();

  const mob = mcdata.entitiesByName[nameParsed];

  if (mob) {
    return findMob(bot, target);
  }

  return findBlocks(bot, target);
}

module.exports = { find, findMob, findBlocks };
