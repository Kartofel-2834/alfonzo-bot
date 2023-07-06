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

// bot.once("spawn", function onSpawn() {
//   selfProtection();
// });

// bot.on("death", function onDeath() {
//   inventory = {};
// });

// Helpers

// async function sendMessage(text) {
//   await sleep(1000);
//   bot.chat(text);
// }

// async function selfProtection() {
//   setInterval(() => {
//     const nearestMob = bot.nearestEntity((entity) => {
//       const { type } = mcdata.entitiesByName[entity.name];
//       return type === "hostile" || type === "mob";
//     });

//     if (!nearestMob || !nearestMob?.name) return;
//     if (getDistanceTo(nearestMob.position) > 3) return;

//     console.log("kick");
//   }, 300);
// }

// function getDistanceTo(position) {
//   return bot.entity.position.distanceTo(position);
// }

// async function kick(target) {
//   if (!target || !target?.position) {
//     sendMessage("Не могу понять кого нужно бить");
//     return;
//   }

//   const { yaw, pitch } = target;
//   const distanceForTarget = getDistanceTo(target.position);

//   await sleep(100);

//   if (distanceForTarget > 3) return;

//   const currentItem = bot.heldItem;
//   const bestWeapon = inventory?.weapon?.length ? inventory.weapon[0] : null;
//   let calldown = 0;

//   bot.look(yaw, pitch, false);

//   if (bestWeapon && bestWeapon.name !== currentItem?.name) {
//     calldown = await heldWeapon();
//   }

//   bot.attack(target);
//   await sleep(calldown);
// }

// async function heldWeapon() {
//   if (!inventory?.weapon?.length) return 0;

//   const [bestWeapon] = inventory.weapon;

//   bot.equip(bestWeapon.item, "hand");
//   await sleep(500);

//   return bestWeapon.info.calldown + 100;
// }

// async function addItemToInventory(item) {
//   if (!item || typeof item?.name !== "string") return;
//   if (!instrumentsInfo[item.name]) return;

//   const info = instrumentsInfo[item.name];

//   for (const type in info) {
//     if (!Array.isArray(inventory[type])) {
//       this.inventory[type] = [];
//     }

//     const efficiency =
//       type === "weapon"
//         ? info[type]?.damage * info[type]?.calldown
//         : info[type];

//     this.inventory[type].push({
//       efficiency,
//       info,
//       item,
//     });

//     this.inventory[type].sort((a, b) => b.efficiency - a.efficiency);
//   }
// }

// async function updateInventory() {
//   const { slots } = this.bot.inventory;

//   this.inventory = {};

//   for (const item of slots) {
//     this.addItemToInventory(item);
//   }

//   for (const itemType in this.inventory) {
//     this.inventory[itemType].sort((a, b) => b.efficiency - a.efficiency);
//   }
// }

// async function wear() {
//   const {
//     armor_chestplate: chestplates,
//     armor_leggins: leggins,
//     armor_boots: boots,
//     armor_helmet: helmets,
//   } = this.inventory;

//   this.bot.unequip("torso");
//   await sleep(500);
//   this.bot.unequip("legs");
//   await sleep(500);
//   this.bot.unequip("feet");
//   await sleep(500);
//   this.bot.unequip("head");
//   await sleep(500);

//   if (Array.isArray(chestplates) && chestplates?.length) {
//     this.bot.equip(chestplates[0].item, "torso");
//     await sleep(500);
//   }

//   if (Array.isArray(leggins) && leggins?.length) {
//     this.bot.equip(leggins[0].item, "legs");
//     await sleep(500);
//   }

//   if (Array.isArray(boots) && boots?.length) {
//     this.bot.equip(boots[0].item, "feet");
//     await sleep(500);
//   }

//   if (Array.isArray(helmets) && helmets?.length) {
//     this.bot.equip(helmets[0].item, "head");
//   }
// }

// // canOpenDoors

// // const viewer = require("prismarine-viewer").mineflayer;

// // bot.once("spawn", () => {
// //     viewer(bot, {
// //     port: 5000,
// //     firstPerson: true,
// //     viewDistance: "25",
// //   });
// // });

// const botConfig = {
//     host: "localhost",
//     port: "46813",
//     version: "1.17.1",
//   };

//   const mineflayer = require("mineflayer");
//   const mcdataGetter = require("minecraft-data");

//   const inventoryViewer = require("mineflayer-web-inventory");
//   const { pathfinder } = require("mineflayer-pathfinder");
//   const { Movements } = require("mineflayer-pathfinder");
//   const { GoalNear, GoalFollow } = require("mineflayer-pathfinder").goals;

//   // Utils
//   const { floor, abs, pow, sqrt } = Math;

//   function sleep(delay) {
//     return new Promise((res) => setTimeout(res, delay));
//   }

//   function getCommandTarget(command, delimiter) {
//     return command.slice(command.indexOf(delimiter) + delimiter.length).trim();
//   }

//   function bingo(input, points = []) {
//     if (typeof input !== "string") return false;

//     for (const point of points) {
//       if (typeof point !== "string") continue;

//       if (point.toLowerCase().includes(input.toLowerCase())) return true;
//     }

//     return false;
//   }

//   // nautro

//   class PokPok {
//     constructor(config) {
//       this.redirect = null;
//       this.inventory = {};

//       this.followTarget = null;
//       this.killTarget = null;

//       this.mcdata = mcdataGetter(config.version);
//       this.instrumentsInfo = require("./instrumentsInfo.js");
//       this.bot = mineflayer.createBot({ ...config, username: "pokpok" });

//       this.setPlugins();
//       this.setEventListeners();
//     }

//     setEventListeners() {
//       this.bot.once("spawn", () => {
//         this.updateInventory();
//         this.wear();
//         //this.selfProtection();
//       });

//       this.bot.on("death", () => this.onDeath());
//       this.bot.on("path_stop", () => this.onPathEnd());
//       this.bot.on("goal_reached", () => this.onPathEnd());
//       this.bot.on("entityDead", (entity) => this.onEntityDead(entity));
//       this.bot.on("playerCollect", (collector, collected) =>
//         this.onPlayerCollect(collector, collected)
//       );

//       this.bot.on("message", (msg) => this.commandsCatcher(msg));
//       this.bot.on("error", (err) => console.log(`ERROR: ${err}`));
//     }

//     setPlugins() {
//       inventoryViewer(this.bot);
//       this.bot.loadPlugin(pathfinder);
//       this.bot.pathfinder.setMovements(new Movements(this.bot, this.mcdata));
//     }

//     async commandsCatcher(msg) {
//       const [username, text] = msg.with
//         .map((part) => part.text)
//         .filter((t) => !!t);

//       if (!username || !text || username === this.bot.username) return;

//       if (!new RegExp(`^${this.bot.username}`).test(text)) return;

//       // Find Command
//       if (/ найди .+$/.test(text)) {
//         await this.commandFind(text);
//       }

//       if (/ убей .+$/.test(text)) {
//         await this.commandKill(text);
//       }

//       if (/ следуй за .+$/.test(text)) {
//         await this.commandFollow(text, username);
//       }

//       if (/ оденься$/.test(text)) {
//         await this.commandWear(text);
//       }
//     }

//     // Events - START
//     onDeath() {
//       this.inventory = {};
//     }

//     onPathEnd() {
//       if (!this.redirect) return;
//       this.redirect();
//       this.redirect = null;
//     }

//     async onPlayerCollect(collector, collected) {
//       if (collector.username !== this.bot.username) return;

//       let item = collected?.metadata?.find((v) => !!v?.itemId);

//       if (!item || !item.itemId || !this.mcdata.items[item.itemId]) return;

//       await sleep(1000);
//       this.updateInventory();
//     }

//     async onEntityDead(entity, redirect = null) {
//       console.log("DEAD", this.killTarget?.name, this.killTarget?.id, entity.id);
//       if (!this.killTarget || entity.id !== this.killTarget?.id) {
//         return;
//       }

//       this.redirect = null;
//       await sleep(500);
//       this.killTarget = null;

//       if (redirect) {
//         this.redirect = redirect;
//       } else if (this.followTarget) {
//         this.redirect = async () => {
//           await sleep(2000);
//           if (this.killTarget) return;
//           this.follow(this.followTarget);
//         };
//       }

//       this.bot.pathfinder.stop();
//       this.bot.pathfinder.setGoal(null);
//     }

//     // Events - END

//     // Commands - START

//     async commandFind(command) {
//       let target = this.find(getCommandTarget(command, "найди"));

//       if (!target || (Array.isArray(target) && !target?.length)) return;

//       target = Array.isArray(target) ? target[0] : target.position;

//       if (this.bot.pathfinder.goal) {
//         this.redirect = () => this.commandFind(command);
//         this.bot.pathfinder.stop();
//         return;
//       }

//       this.goTo(target);
//     }

//     async commandKill(command) {
//       const targetName = getCommandTarget(command, "убей");
//       const target = this.findMob(targetName);

//       if (!target) {
//         this.bot.chat(`Я не нашел ${targetName}`);
//         return;
//       }

//       this.kill(target);
//     }

//     async commandFollow(command, username) {
//       this.killTarget = null;
//       this.redirect = null;

//       let targetName = getCommandTarget(command, "следуй за");
//       targetName = targetName === "мной" ? username : targetName;

//       const target = this.bot.players[targetName];

//       if (!target || !target?.entity) {
//         this.sendMessage(`Я не могу следовать за ${targetName}`);
//         return;
//       }

//       this.followTarget = target.entity;

//       if (this.bot.pathfinder.goal) {
//         this.redirect = () => this.follow(target?.entity);
//         this.bot.pathfinder.stop();
//         return;
//       }

//       this.follow(target?.entity);
//     }

//     async commandWear() {
//       await this.wear();
//     }

//     // Commands - END

//     async selfProtection() {
//       while (true) {
//         await sleep(2000);

//         const nearestMob = this.bot.nearestEntity((entity) => {
//           const { type } = this.mcdata.entitiesByName[entity.name];
//           return type === "hostile" || type === "mob";
//         });

//         if (!nearestMob || !nearestMob?.name) continue;
//         if (this.distanceTo(nearestMob.position) > 15) continue;

//         this.kill(nearestMob);
//       }
//     }

//     async sendMessage(text) {
//       await sleep(1000);
//       this.bot.chat(text);
//     }

//     distanceTo(position) {
//       return this.bot.entity.position.distanceTo(position);
//     }

//     follow(target, range = 1, targetName = "этим") {
//       if (!target || !target?.position) {
//         this.sendMessage(`Я не могу следовать за ${targetName}`);
//         return;
//       }

//       this.bot.pathfinder.setGoal(new GoalFollow(target, range), true);
//     }

//     async addItemToInventory(item) {
//       if (!item || typeof item?.name !== "string") return;
//       if (!this.instrumentsInfo[item.name]) return;

//       const info = this.instrumentsInfo[item.name];

//       for (const type in info) {
//         if (!Array.isArray(this.inventory[type])) {
//           this.inventory[type] = [];
//         }

//         const efficiency =
//           type === "weapon"
//             ? info[type]?.damage * info[type]?.calldown
//             : info[type];

//         this.inventory[type].push({
//           efficiency,
//           info,
//           item,
//         });

//         this.inventory[type].sort((a, b) => b.efficiency - a.efficiency);
//       }
//     }

//     async updateInventory() {
//       const { slots } = this.bot.inventory;

//       this.inventory = {};

//       for (const item of slots) {
//         this.addItemToInventory(item);
//       }

//       for (const itemType in this.inventory) {
//         this.inventory[itemType].sort((a, b) => b.efficiency - a.efficiency);
//       }
//     }

//     async wear() {
//       const {
//         armor_chestplate: chestplates,
//         armor_leggins: leggins,
//         armor_boots: boots,
//         armor_helmet: helmets,
//       } = this.inventory;

//       this.bot.unequip("torso");
//       await sleep(500);
//       this.bot.unequip("legs");
//       await sleep(500);
//       this.bot.unequip("feet");
//       await sleep(500);
//       this.bot.unequip("head");
//       await sleep(500);

//       if (Array.isArray(chestplates) && chestplates?.length) {
//         this.bot.equip(chestplates[0].item, "torso");
//         await sleep(500);
//       }

//       if (Array.isArray(leggins) && leggins?.length) {
//         this.bot.equip(leggins[0].item, "legs");
//         await sleep(500);
//       }

//       if (Array.isArray(boots) && boots?.length) {
//         this.bot.equip(boots[0].item, "feet");
//         await sleep(500);
//       }

//       if (Array.isArray(helmets) && helmets?.length) {
//         this.bot.equip(helmets[0].item, "head");
//       }
//     }

//     async kick(target) {
//       if (!target || !target?.position) {
//         this.sendMessage("Не могу понять кого нужно бить");
//         return;
//       }

//       const { yaw, pitch } = target;
//       const distanceForTarget = this.distanceTo(target.position);

//       await sleep(100);

//       if (distanceForTarget > 3) return;

//       const currentItem = this.bot.heldItem;
//       const bestWeapon = this.inventory?.weapon?.length
//         ? this.inventory.weapon[0]
//         : null;
//       let calldown = 0;

//       this.bot.look(yaw, pitch, false);

//       if (bestWeapon && bestWeapon.name !== currentItem?.name) {
//         calldown = await this.heldWeapon();
//       }

//       this.bot.attack(target);
//       await sleep(calldown);
//     }

//     async heldWeapon() {
//       if (!this.inventory?.weapon?.length) return 0;

//       const [bestWeapon] = this.inventory.weapon;

//       this.bot.equip(bestWeapon.item, "hand");
//       await sleep(500);

//       return bestWeapon.info.calldown + 100;
//     }

//     async kill(target = null) {
//       if (!target || !target?.position) {
//         return;
//       }

//       if (this.killTarget) {
//         if (this.killTarget?.id !== target.id) {
//           this.onEntityDead(this.killTarget, () => this.kill(target));
//         }

//         return;
//       }

//       if (this.bot.pathfinder.goal) {
//         this.redirect = () => this.kill(target);
//         this.bot.pathfinder.stop();
//         return;
//       }

//       this.follow(target, 2, target.name);

//       this.killTarget = target;

//       const interval = setInterval(() => {
//         console.log(this.killTarget?.name);
//         if (!this.killTarget || target.id !== this.killTarget.id) {
//           clearInterval(interval);
//           return;
//         }

//         this.kick(target);
//       }, 500);
//     }

//     goTo({ x, y, z }) {
//       this.bot.pathfinder.setGoal(new GoalNear(x, y, z, 1));
//     }

//     findMob(name) {
//       if (typeof name !== "string" || !this.bot?.entity?.position) return null;

//       try {
//         return this.bot.nearestEntity((entity) =>
//           bingo(name, [entity.displayName, entity.name])
//         );
//       } catch (err) {
//         console.log(err);
//         return null;
//       }
//     }

//     findBlocks(name, count = 1) {
//       try {
//         return this.bot.findBlocks({
//           matching: (block) => bingo(name, [block.displayName, block.name]),
//           maxDistance: 1000,
//           count,
//         });
//       } catch (err) {
//         console.log(err);
//         return [];
//       }
//     }

//     find(name) {
//       if (typeof name !== "string") return null;

//       const nameParsed = name.split(" ").join("_").toLowerCase();

//       const mob = this.mcdata.entitiesByName[nameParsed];

//       if (mob) {
//         return this.findMob(name);
//       }

//       return this.findBlocks(name);
//     }
//   }

//   const pokpok = new PokPok(botConfig);
