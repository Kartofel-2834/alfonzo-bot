const { GoalNear } = require("mineflayer-pathfinder").goals;

const sendMessage = require("../actions/sendMessage");

const { round } = Math;

async function action(text, username, state, update) {
  if (!state?.home) {
    sendMessage(this, "У меня нет дома :(");
    return;
  }

  const { x, y, z } = state.home;

  update("priority", 10);
  this.pathfinder.setGoal(new GoalNear(x, y, z));
}

const test = / home$/;

module.exports = { action, test };
