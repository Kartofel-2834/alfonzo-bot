const { wear } = require("../actions/held");

async function action() {
  await wear(this);
}

const test = / wear$/;

module.exports = { action, test };
