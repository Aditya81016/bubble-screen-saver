import Entity from ".";
import calcAngle from "../../controller/calcAngle";
import calcDistance from "../../controller/calcDistance";
import calcHypotenuse from "../../controller/calcHypotenuse";
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
    callback = (distance: number, entity: Entity) => {}
  ) {
    const entities = entity.canvas.entities;
    const index = entities.indexOf(entity);

    for (let i = index + 1; i < entities.length; i++) {
      const entity2 = entities[i];
      const radius =
        calcHypotenuse(entity.width, entity.height) +
        calcHypotenuse(entity2.width, entity2.height);

      const pos1: [number, number] = [entity.x, entity.y];
      const pos2: [number, number] = [entity2.x, entity2.y];

      const distance = calcDistance(pos1, pos2);

      if (distance <= radius) {
        callback(distance, entity2);
      }
    }
  }
}
