const sendMessage = require("../actions/sendMessage");

const compareVecs = require("../utils/compareVecs");

function getWaitDelay(priority) {
  switch (priority) {
    case 15:
      return 100;
    case 10:
      return 5;
    case 5:
      return 3;

    default:
      return 2;
  }
}

function movement(state, update) {
  if (!this.pathfinder.goal) return;

  const setRepeats = (repeats) => {
    update("stopped", { ...state.stopped, repeats });
  };

  if (!state.stopped.lastPosition) {
    update("stopped", { ...state.stopped, lastPosition: this.entity.position });
    return;
  }

  const isMoved = !compareVecs(
    this.entity.position,
    state.stopped.lastPosition,
    1
  );

  update("stopped", { ...state.stopped, lastPosition: this.entity.position });

  if (state.stopped.repeats >= getWaitDelay(state.priority)) {
    if (state.priority >= 10) {
      sendMessage(this, "Я переключился");
    }

    this.pathfinder.setGoal(null);
    update("priority", 0);
    setRepeats(0);
    return;
  }

  setRepeats(isMoved ? 0 : state.stopped.repeats + 1);
}

module.exports = movement;
