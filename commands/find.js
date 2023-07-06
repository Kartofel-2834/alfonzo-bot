const { GoalNear, GoalFollow } = require("mineflayer-pathfinder").goals;

const { find } = require("../actions/find");
const sendMessage = require("../actions/sendMessage");

const getCommandTarget = require("../utils/getCommandTarget");

async function action(text, username, state, update) {
  const targetName = getCommandTarget(text, "find");
  const target = find(this, targetName);

  if (!target || (Array.isArray(target) && !target?.length)) {
    sendMessage(this, `Я не нашел ${targetName}`);
    return;
  }

  if (state.priority > 10) {
    sendMessage(this, "Я сейчас занят более важным делом");
    return;
  }

  update("priority", 10);

  if (!Array.isArray(target)) {
    this.pathfinder.setGoal(new GoalFollow(target));
    return;
  }

  const { x, y, z } = Array.isArray(target) ? target.shift() : target;
  this.pathfinder.setGoal(new GoalNear(x, y, z));
}

const test = / find .+$/;

module.exports = { action, test };
