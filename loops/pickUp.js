const { GoalNear } = require("mineflayer-pathfinder").goals;

const { round } = Math;

function pickUp(state, update) {
  const droppedItem = this.nearestEntity(
    (entity) =>
      entity.name === "item" &&
      this.entity.position.distanceTo(entity.position) < 5
  );

  if (!droppedItem || !droppedItem?.metadata?.length) return;
  if (!droppedItem.metadata[droppedItem.metadata.length - 1]?.itemId) return;

  if (state.priority > 5) return;

  const { x, y, z } = droppedItem.position;

  update("priority", 5);
  this.pathfinder.setGoal(new GoalNear(round(x), round(y), round(z)));
}

module.exports = pickUp;
