const { abs } = Math;

function compareVecs(a, b, difference = 1) {
  const deltaX = abs(a.x - b.x);
  const deltaY = abs(a.y - b.y);
  const deltaZ = abs(a.z - b.z);

  return deltaX <= difference && deltaY <= difference && deltaZ <= difference;
}

module.exports = compareVecs;
