import Canvas from "./";
import CanvasFrame from "./CanvasFrame";

export default class CanvasCalculator {
  canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  calculate = (frame: CanvasFrame) => {
    this.canvas.entities.forEach((entity) => {
      entity.motion.update(entity, frame);
    });
  };
}
