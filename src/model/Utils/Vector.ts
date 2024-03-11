type Matrix = [number, number];

export default class Vector {
  private _magnitude: number;
  private _direction: number;
  private _matrix: Matrix;

  constructor(magnitude: number, direction: number) {
    this._magnitude = magnitude;
    this._direction = direction;

    this._matrix = Vector.calcMatrix(this);
  }

  set magnitude(value: number) {
    this._magnitude = value;
    this._matrix = Vector.calcMatrix(this);
  }

  get magnitude() {
    return this._magnitude;
  }

  set direction(value: number) {
    this._direction = value;
    this._matrix = Vector.calcMatrix(this);
  }

  get direction() {
    return this._direction;
  }

  set matrix(value: Matrix) {
    this._matrix = value;
    const magDir = Vector.calcMagDir(this);
    this._magnitude = magDir[0];
    this._direction = magDir[1];
  }

  get matrix() {
    return this._matrix;
  }

  add(vector: Vector) {
    const a = this.magnitude;
    const b = vector.magnitude;
    const theta = this.direction - vector.direction;

    // const magnitude = Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(theta));
    const direction = (b * Math.sin(theta)) / (a + b * Math.cos(theta));

    this.magnitude = this.magnitude;
    this.direction = direction;
  }

  static calcMatrix(vector: Vector): Matrix {
    const x = vector.magnitude * Math.cos(vector.direction);
    const y = vector.magnitude * Math.sin(vector.direction);
    return [x, y];
  }

  static calcMagDir(vector: Vector) {
    const magnitude = Math.sqrt(
      vector.matrix[0] * vector.matrix[0] + vector.matrix[1] * vector.matrix[1]
    );
    const direction = Math.atan(vector.matrix[1] / vector.matrix[0]);
    return [magnitude, direction];
  }
}
