export default function calcAngle(
  pos1: [number, number],
  pos2: [number, number]
) {
  const height = pos1[1] - pos2[1];
  const base = pos1[0] - pos2[0];

  const slope = height / base;

  let angle = Math.atan(slope);
  if (base > 0) angle += Math.PI;
  return angle;
}
