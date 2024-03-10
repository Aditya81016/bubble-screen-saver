import CanvasCalculator from "./CanvasCalculator";
import CanvasPainter from "./CanvasPainter";
import Entity from "../Entity";
import CanvasFrame from "./CanvasFrame";

export enum CanvasState {
  INITIAL,
  PLAY,
  PAUSE,
  END,
}

export default class Canvas {
  element;
  ctx;
  timeSpent = 0; // total time spent since canvas loop started
  frames = 0;

  canvasPainter: CanvasPainter;
  canvasCalculator: CanvasCalculator;

  entities: Entity[];

  state: CanvasState = CanvasState.INITIAL;

  constructor(
    canvasId: string,
    entities: Entity[] = [],
    canvasPainter: CanvasPainter | undefined = undefined,
    canvasCalculator: CanvasCalculator | undefined = undefined
  ) {
    this.element = document.createElement("canvas");
    this.element.id = canvasId;

    this.ctx = this.element.getContext("2d");

    this.entities = entities;

    this.canvasPainter = canvasPainter ?? new CanvasPainter(this);
    this.canvasCalculator = canvasCalculator ?? new CanvasCalculator(this);
  }

  appendTo(query: string) {
    document.querySelector(query)?.appendChild(this.element);
  }

  setDimensions(width: number, height: number) {
    this.element.width = width;
    this.element.height = height;
  }

  /**
   * Description
   * @param {number} currentTime - time progressed after last loop
   * @returns {void}
   */
  loop = (currentTime: number): void => {
    const frame = new CanvasFrame(this, currentTime);

    this.frames++;

    if (this.state === CanvasState.PLAY) {
      this.canvasPainter.paint();
      this.canvasCalculator.calculate(frame);
      requestAnimationFrame(this.loop);
    }
  };

  start = () => {
    this.state = CanvasState.PLAY;
    console.log("start");
    requestAnimationFrame(this.loop);
  };

  pause = () => {
    this.state = CanvasState.PAUSE;
  };

  continue = () => {
    this.state = CanvasState.PLAY;
  };
}
