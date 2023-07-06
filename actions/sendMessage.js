const sleep = require("../utils/sleep");

async function sendMessage(bot, message, thinkDelay = 1000) {
  await sleep(thinkDelay);
  console.log(`\n${'-'.repeat(50)}\nAlfonzo: ${message}`)
  bot.chat(message);
}

module.exports = sendMessage;
