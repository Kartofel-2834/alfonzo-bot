const instruments = require("../instrumentsInfo");
const sleep = require("../utils/sleep");

function getBest(bot, type, efficient = (item) => item) {
  return bot.inventory.slots.reduce((bestOfTheBest, item) => {
    if (!item || !item?.name) return bestOfTheBest;

    if (!instruments[item.name] || !instruments[item.name][type]) {
      return bestOfTheBest;
    }

    if (!bestOfTheBest || !bestOfTheBest?.name) return item;

    const targetInfo = instruments[item.name][type];
    const bestInfo = instruments[bestOfTheBest.name][type];

    const a = efficient(targetInfo);
    const b = efficient(bestInfo);

    return a > b ? item : weapon;
  }, null);
}

function equip(bot, type, destination, efficient = (item) => item) {
  const best = getBest(bot, type, efficient);

  if (!best) return null;

  bot.equip(best, destination);
  return best;
}

function heldWeapon(bot) {
  return equip(bot, "weapon", "hand", (weapon) => weapon.damage * weapon.calldown);
}

function heldHelmet(bot) {
  return equip(bot, "armor_helmet", "head");
}

function heldShirt(bot) {
  return equip(bot, "armor_chestplate", "torso");
}

function heldPants(bot) {
  return equip(bot, "armor_leggins", "legs");
}

function heldBoots(bot) {
  return equip(bot, "armor_boots", "feet");
}

async function wear(bot) {
  bot.unequip("torso");
  await sleep(500);
  bot.unequip("legs");
  await sleep(500);
  bot.unequip("feet");
  await sleep(500);
  bot.unequip("head");
  await sleep(500);

  heldHelmet(bot);
  await sleep(500);
  heldShirt(bot);
  await sleep(500);
  heldPants(bot);
  await sleep(500);
  heldBoots(bot);
  await sleep(500);
}

module.exports = {
  weapon: heldWeapon,
  helmet: heldHelmet,
  shirt: heldShirt,
  pants: heldPants,
  boots: heldBoots,
  wear,
};
