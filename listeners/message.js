const commands = require("../commands/index.js");

async function onMessage(msg, position, sender, verifyed, state, update) {
  if (!msg || !msg?.with) return;

  const [username, text] = msg.with.map((part) => part.text).filter((t) => !!t);

  if (!username || !text || username === this.username) return;

  if (!new RegExp(`^${this.username}`).test(text)) return;

  for (const command in commands) {
    if (commands[command].test.test(text, username)) {
      await commands[command].action.bind(this)(text, username, state, update);
    }
  }
}

module.exports = onMessage;
