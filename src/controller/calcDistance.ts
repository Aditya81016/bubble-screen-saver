export default function calcDistance(
  pos1: [number, number],
  pos2: [number, number]
) {
  const height = pos2[1] - pos1[1];
  const base = pos2[0] - pos1[0];

  const distance = Math.sqrt(Math.pow(height, 2) + Math.pow(base, 2));

  return distance;
}
