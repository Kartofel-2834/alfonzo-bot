const armor = {
  turtle_helmet: {
    armor_helmet: 2,
  },

  // Leather armor
  leather_chestplate: {
    armor_chestplate: 3,
  },
  leather_leggings: {
    armor_leggins: 2,
  },
  leather_boots: {
    armor_boots: 1,
  },
  leather_helmet: {
    armor_helmet: 1,
  },

  // Iron armor
  iron_chestplate: {
    armor_chestplate: 6,
  },
  iron_leggings: {
    armor_leggins: 5,
  },
  iron_boots: {
    armor_boots: 2,
  },
  iron_helmet: {
    armor_helmet: 2,
  },

  // Chainmail armor
  chainmail_chestplate: {
    armor_chestplate: 5,
  },
  chainmail_leggings: {
    armor_leggins: 4,
  },
  chainmail_boots: {
    armor_boots: 1,
  },
  chainmail_helmet: {
    armor_helmet: 2,
  },

  // Golden armor
  chainmail_chestplate: {
    armor_chestplate: 5,
  },
  chainmail_leggings: {
    armor_leggins: 3,
  },
  chainmail_boots: {
    armor_boots: 1,
  },
  chainmail_helmet: {
    armor_helmet: 2,
  },

  // Diamond armor
  diamond_chestplate: {
    armor_chestplate: 8,
  },
  diamond_leggings: {
    armor_leggins: 6,
  },
  diamond_boots: {
    armor_boots: 3,
  },
  diamond_helmet: {
    armor_helmet: 3,
  },

  // Netherite armor netherite
  netherite_chestplate: {
    armor_chestplate: 9,
  },
  netherite_leggings: {
    armor_leggins: 7,
  },
  netherite_boots: {
    armor_boots: 4,
  },
  netherite_helmet: {
    armor_helmet: 4,
  },
};

const instruments = {
  wooden_sword: {
    weapon: { damage: 4, calldown: 630 },
  },

  stone_sword: {
    weapon: { damage: 5, calldown: 630 },
  },

  golden_sword: {
    weapon: { damage: 4, calldown: 630 },
  },

  iron_sword: {
    weapon: { damage: 6, calldown: 630 },
  },

  diamond_sword: {
    weapon: { damage: 7, calldown: 630 },
  },

  netherite_sword: {
    weapon: { damage: 8, calldown: 630 },
  },
};

const data = {
  ...armor,
  ...instruments,
};

module.exports = data;
