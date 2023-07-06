const config = require("../config.js");
const mcdata = require("minecraft-data")(config.bot.version);

const held = require("../actions/held");
const instruments = require("../instrumentsInfo");
const sleep = require("../utils/sleep");

async function protect(state, update) {
  if (state.weaponCalldown) return;

  const nearestMob = this.nearestEntity((entity) => {
    if (this.entity.position.distanceTo(entity.position) > 5) return false;

    const { type } = mcdata.entitiesByName[entity.name];
    return type === "hostile" || state.blacklist.has(entity.id);
  });

  if (!nearestMob || !nearestMob?.name) return;

  const bestWeapon = held.weapon(this);

  this.attack(nearestMob);

  if (!bestWeapon) return;

  const { calldown } = instruments[bestWeapon.name]?.weapon;

  if (isNaN(calldown)) return;

  update("weaponCalldown", true);
  await sleep(calldown + 100);
  update("weaponCalldown", false);
}

module.exports = protect;
