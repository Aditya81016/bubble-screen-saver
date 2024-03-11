import Canvas from "./model/Canvas";
import CanvasFrame from "./model/Canvas/CanvasFrame";
import Entity from "./model/Entity";
import EntityMotion from "./model/Entity/EntityMotion";
import EntityStats from "./model/Entity/EntityStats";
import Vector from "./model/Utils/Vector";
import "./style.css";

const quantity = 10;
const radius = 150;

const canvas = new Canvas("main");
canvas.setDimensions(window.innerWidth, window.innerHeight);
document.body.onresize = () => {
  canvas.setDimensions(window.innerWidth, window.innerHeight);
};

canvas.appendTo("#root");

canvas.start();

const defaultMotion = new EntityMotion((entity: Entity, frame: CanvasFrame) => {
  EntityMotion.onCollisionWithWall(entity, frame);

  // EntityMotion.onCollisionWithEntity(entity, frame);

  EntityMotion.followVelocity(entity, frame);
});

for (let i = 0; i < quantity; i++) {
  const image = new Image();
  image.src = "/bubble.svg";

  const stats = new EntityStats({
    velocity: new Vector(100, Math.random() * 2 * Math.PI),
  });

  const dimensions: [number, number] = [radius, radius];

  const coordinates: [number, number] = [
    Math.random() * (window.innerWidth - radius),
    Math.random() * (window.innerHeight - radius),
  ];

  const entity = new Entity(
    canvas,
    image,
    defaultMotion,
    stats,
    dimensions,
    coordinates
  );
  canvas.entities.push(entity);
}
