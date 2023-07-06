const { GoalFollow } = require("mineflayer-pathfinder").goals;

const { findMob } = require("../actions/find");
const sendMessage = require("../actions/sendMessage");

const getCommandTarget = require("../utils/getCommandTarget");

async function action(text, username, state, update) {
  const targetName = getCommandTarget(text, "kill");
  const target = findMob(this, targetName);

  if (!target || !target?.position || !target?.id) {
    sendMessage(this, `Я не могу убить ${targetName}`);
    return;
  }

  if (state.priority > 10) {
    sendMessage(this, "Я сейчас занят более важным делом");
    return;
  }

  update("priority", 10);
  update("blacklist", new Set([...state.blacklist, target.id]));
  this.pathfinder.setGoal(new GoalFollow(target, 2), true);
}

const test = / kill .+$/;

module.exports = { action, test };
