const spawn = require("./spawn");
const message = require("./message");
const hurt = require("./hurt");
const goalReached = require("./goalReached");

module.exports = {
  spawn,
  message,
  entityHurt: hurt,
  goal_reached: goalReached,
  path_stop: goalReached,
};
