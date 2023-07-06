const { GoalFollow } = require("mineflayer-pathfinder").goals;

const sendMessage = require("../actions/sendMessage");

const getCommandTarget = require("../utils/getCommandTarget");

async function action(text, username, state, update) {
  if (state.priority > 15) {
    sendMessage(this, "Я сейчас занят более важным делом");
    return;
  }

  let targetName = getCommandTarget(text, "follow");
  targetName = targetName === "me" ? username : targetName;

  if (!Object.keys(this.players).includes(targetName)) {
    sendMessage(this, `Я не могу следовать за ${targetName}`);
    return;
  }

  const target = this.players[targetName]?.entity;

  update("priority", 15);
  this.pathfinder.setGoal(new GoalFollow(target, 2), true);
}

const test = / follow .+$/;

module.exports = { action, test };
