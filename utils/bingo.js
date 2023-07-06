function bingo(input, points = []) {
  if (typeof input !== "string") return false;

  for (const point of points) {
    if (typeof point !== "string") continue;

    if (point.toLowerCase().includes(input.toLowerCase())) return true;
  }

  return false;
}

module.exports = bingo;
