function action(text, username, state, update) {
  console.log("STOP-STOP-STOP");
  this.pathfinder.setGoal(null);
  update("priority", 0);
}

const test = / stop$/;

module.exports = { action, test };
