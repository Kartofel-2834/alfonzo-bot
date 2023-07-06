function getInventory(bot) {
  const info = bot.inventory.slots.reduce((res, item) => {
    if (!item || !item?.name) return res;
    return { ...res, [item.name]: (res[item.name] || 0) + item.count };
  }, {});

  return info
}

module.exports = getInventory;
