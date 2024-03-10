import Entity from ".";
import CanvasFrame from "../Canvas/CanvasFrame";

export default class EntityMotion {
  update: UpdateMethod;

  constructor(update: UpdateMethod) {
    this.update = update;
  }

  static followVelocity(entity: Entity, frame: CanvasFrame) {
    entity.x += entity.stats.velocity.matrix[0] * frame.ratio;
    entity.y += entity.stats.velocity.matrix[1] * frame.ratio;
  }

  static onCollisionWithWall(
    entity: Entity,
    frame: CanvasFrame,
    callback = () => {}
  ) {
    if (
      entity.x <= 0 ||
      entity.x >= frame.canvas.element.width - entity.width
    ) {
      entity.stats.velocity.matrix[0] *= -1;
      callback();
    }

    if (
      entity.y <= 0 ||
      entity.y >= frame.canvas.element.height - entity.height
    ) {
      entity.stats.velocity.matrix[1] *= -1;
      callback();
    }
  }

  static onCollisionWithEntity(
    entity: Entity,
    frame: CanvasFrame,
    callback = () => {}
  ) {}
}
