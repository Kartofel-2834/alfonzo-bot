const config = require("../config.js");
const mcdata = require("minecraft-data")(config.bot.version);

const prohibitedFood = new Set([
  "poisonous_potato",
  "rotten_flesh",
  "pufferfish",
  "beef",
  "rabbit",
  "chicken",
  "cod",
  "porkchop",
  "cooked_porkchop",
  "salmon",
  "mutton",
]);

async function glutton(state, update) {
  if (state.priority >= 5 || state.eating || this.food > 18) return;

  const food = this.inventory.slots.filter(
    (item) =>
      item &&
      item?.name &&
      !prohibitedFood.has(item?.name) &&
      mcdata.foodsByName[item?.name]
  );

  if (!food.length) return;

  update("eating", true);
  this.equip(food[0], "hand");
  await this.consume();
  update("eating", false);
}

module.exports = glutton;
