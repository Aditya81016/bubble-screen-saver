import Vector from "../Utils/Vector";

export type Stats = {
  velocity?: Vector;
};

export default class EntityStats {
  velocity: Vector = new Vector(100, 0);

  hadBeenFreeOnce = false;

  constructor(stats: Stats = {}) {
    for (const key in stats) {
      // @ts-ignore
      this[key] = stats[key];
    }
  }
}
