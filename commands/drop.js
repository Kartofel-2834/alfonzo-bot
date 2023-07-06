const { find } = require("../actions/find");
const sendMessage = require("../actions/sendMessage");
const getInventory = require("../actions/getInventory");

const getCommandTarget = require("../utils/getCommandTarget");
const bingo = require("../utils/bingo");

async function action(text, username, state, update) {
  const targets = getCommandTarget(text, "drop").split(" ");

  const itemName = targets.shift();

  let count = targets.length ? targets.shift() : 1;
  count = count === "all" ? -1 : count;
  count = isNaN(+count) ? NaN : Number(count);

  if (isNaN(count) || (count !== -1 && count < 0)) {
    sendMessage(this, "Я не понял сколько предметов нужно скинуть");
    return;
  }

  const dropItems = this.inventory.slots.filter(
    (item) => !!item && bingo(itemName, [item?.name])
  );

  console.log(dropItems);

  if (!dropItems.length) {
    sendMessage(this, `У меня нет ${itemName}`);
    return;
  }

  if (state.priority < 10) {
    update("priority", 10);
    sendMessage(this, "Лады, тогда я не буду пока подбирать предметы")
  }

  while ((count === -1 || count > 0) && dropItems.length) {
    const item = dropItems.shift();
    const toDrop = item.count >= count && count !== -1 ? count : item.count;

    if (count !== -1) {
      count -= toDrop;
    }

    await this.toss(item.type, item.metadata, toDrop);
  }
}

const test = / drop .+$/;

module.exports = { action, test };
