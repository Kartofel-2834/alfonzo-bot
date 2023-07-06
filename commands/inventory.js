const getInventory = require("../actions/getInventory.js");

async function action() {
  console.table(getInventory(this));
}

const test = / inventory$/;

module.exports = { action, test };
