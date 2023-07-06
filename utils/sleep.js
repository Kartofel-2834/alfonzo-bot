async function sleep(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

module.exports = sleep;
