const config = require("../config.js");
const mcdata = require("minecraft-data")(config.bot.version);

async function onHurt(entity, state, update) {
  if (entity?.username !== this.username) return;

  const nearestMob = this.nearestEntity((entity) => {
    if (
      !mcdata.entitiesByName[entity.name] ||
      !mcdata.entitiesByName[entity.name]?.type
    ) {
      return false;
    }

    const { type } = mcdata.entitiesByName[entity.name];

    return (
      (type === "hostile" || type === "mob" || type === "animal") &&
      this.entity.position.distanceTo(entity.position) < 5
    );
  });

  if (!nearestMob || !nearestMob?.id) return;

  update(
    "blacklist",
    state.blacklist.size >= 10
      ? new Set([nearestMob.id])
      : new Set([...state.blacklist, nearestMob.id])
  );
}

module.exports = onHurt;
