const { wear } = require("../actions/held");
const sendMessage = require("../actions/sendMessage");

function onSpawn() {
  sendMessage(this, "ABOBUS");
  wear(this);
}

module.exports = onSpawn;
