import Canvas from ".";

export default class CanvasFrame {
  canvas: Canvas;
  timeProgress: number;
  ratio: number;

  constructor(canvas: Canvas, currentTime: number) {
    this.canvas = canvas;

    this.timeProgress = currentTime - this.canvas.timeSpent;
    this.canvas.timeSpent = currentTime;

    this.ratio = this.timeProgress / 1000;
  }
}
