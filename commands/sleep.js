const { action: goHome } = require("./home");

const sendMessage = require("../actions/sendMessage");

async function action(text, username, state, update) {
  if (state.priority >= 10) {
    sendMessage(this, "Я сейчас занят более важным делом");
    return;
  }

  if (state.home && state.home.distanceTo(this.entity.position) > 3) {
    sendMessage(this, "Я пока еще не дома");
    goHome.bind(this)(text, username, state, update);
    return;
  }

  const bed = this.findBlock({
    matching: (block) => /_bed$/.test(block.name),
  });

  if (!bed || !this.isABed(bed)) {
    sendMessage(this, "Я не нашел кровать");
    return;
  }

  try {
    await this.sleep(bed);
  } catch (err) {
    sendMessage(this, `Я не могу уснуть - ${err.message}`);
  }
}

const test = / sleep$/;

module.exports = { action, test };
