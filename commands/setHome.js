const { Vec3 } = require("vec3");
const sendMessage = require("../actions/sendMessage");

const { round } = Math;

async function action(text, username, state, update) {
  if (!Object.keys(this.players).includes(username)) {
    sendMessage(this, "Я не понимаю куда ты указываешь");
    return;
  }

  const target = this.players[username]?.entity;

  if (!target || !target?.position) {
    sendMessage(this, "Где ты?");
    return;
  }

  const { x, y, z } = target.position;

  update("home", new Vec3(x, y, z));
  sendMessage(
    this,
    `Ура! Новый дом - (x: ${round(x)}, y: ${round(y)}, z: ${round(z)})`
  );
}

const test = / set home$/;

module.exports = { action, test };
