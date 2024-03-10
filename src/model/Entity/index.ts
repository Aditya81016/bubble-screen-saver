import range from "../../controller/range";
import Canvas from "../Canvas";
import EntityMotion from "./EntityMotion";
import EntityStats from "./EntityStats";

export default class Entity {
  canvas: Canvas;

  width: number;
  height: number;

  private _x: number = 0;
  private _y: number = 0;

  image: HTMLImageElement;
  isReadyToUse = false;

  motion: EntityMotion;
  stats: EntityStats;

  constructor(
    canvas: Canvas,
    image: HTMLImageElement,
    motion: EntityMotion,
    stats: EntityStats = new EntityStats(),
    dimensions: [number, number] | undefined = undefined,
    coordinates: [number, number] | undefined = undefined
  ) {
    this.canvas = canvas;

    this.width = dimensions ? dimensions[0] : 4 * 10;
    this.height = dimensions ? dimensions[1] : 4 * 10;

    this.x = coordinates ? coordinates[0] : 0;
    this.y = coordinates ? coordinates[1] : 0;

    this.image = image;
    this.image.addEventListener("load", () => {
      console.log("create entity");
      this.isReadyToUse = true;
    });

    this.image.onerror = (e) => {
      console.log("error", e);
    };

    this.motion = motion;
    this.stats = stats;
  }

  set x(value: number) {
    this._x = range(0, this.canvas.element.width - this.width, value);
  }

  get x() {
    return this._x;
  }

  set y(value: number) {
    this._y = range(0, this.canvas.element.height - this.height, value);
  }

  get y() {
    return this._y;
  }
}
