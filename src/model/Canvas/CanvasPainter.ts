import Canvas from "./";

export default class CanvasPainter {
  canvas: Canvas;
  ctx;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.ctx;
  }

  paint = () => {
    this.clear();

    this.canvas.entities.forEach((entity) => {
      if (entity.isReadyToUse) {
        this.ctx?.drawImage(
          entity.image,
          entity.x,
          entity.y,
          entity.width,
          entity.height
        );
      }
    });
  };

  clear = () => {
    this.ctx?.clearRect(
      0,
      0,
      this.canvas.element.width,
      this.canvas.element.height
    );
  };
}
