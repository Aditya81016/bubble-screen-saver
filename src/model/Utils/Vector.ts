type Matrix = [number, number];

export default class Vector {
  readonly magnitude: number;
  readonly direction: number;
  readonly matrix: Matrix;

  constructor(magnitude: number, direction: number) {
    this.magnitude = magnitude;
    this.direction = direction;

    this.matrix = Vector.calcMatrix(this);
  }

  static calcMatrix(vector: Vector): Matrix {
    const x = vector.magnitude * Math.cos(vector.direction);
    const y = vector.magnitude * Math.sin(vector.direction);
    return [x, y];
  }
}
