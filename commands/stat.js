const { floor } = Math;

const sendMessage = require("../actions/sendMessage");

async function action() {
  const health = floor(this.health / 2);
  const food = floor(this.food / 2);

  let message = '-'.repeat(50) + '\n\n' 
  message += `Health:\n${"w ".repeat(health)}${"_ ".repeat(10 - health)}\n\n`;
  message += `Food:\n${"& ".repeat(food)}${"_ ".repeat(10 - food)}\n\n`;

  console.log(message)
}

const test = / stat$/;

module.exports = { action, test };
