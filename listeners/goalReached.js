function onGoalReached(goal, state, update) {
  update("priority", 0);
  console.log("GOAL-REACHED!")
}

module.exports = onGoalReached;
