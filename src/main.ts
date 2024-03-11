// import calcAngle from "./controller/calcAngle";
// import calcDistance from "./controller/calcDistance";
import Canvas from "./model/Canvas";
import CanvasFrame from "./model/Canvas/CanvasFrame";
import Entity from "./model/Entity";
import EntityMotion from "./model/Entity/EntityMotion";
import EntityStats from "./model/Entity/EntityStats";
import Vector from "./model/Utils/Vector";
import "./style.css";

let quantity = 10;
let radius = 150;
let speed = 100;
let handleInterCollision = false;

// this set of code lets url params customize constants
const params = window.location.search.substring(1).split("&");
params.forEach((param) => {
  const paramArr = param.split("=");
  switch (paramArr[0]) {
    case "quantity":
      quantity = Number(paramArr[1]);
      break;
    case "radius":
      radius = Number(paramArr[1]);
      break;
    case "speed":
      speed = Number(paramArr[1]);
      break;
    case "handleInterCollision":
      handleInterCollision = Boolean(paramArr[1]);
      break;
    default:
  }
});

const canvas = new Canvas("main");
canvas.setDimensions(window.innerWidth, window.innerHeight);
document.body.onresize = () => {
  canvas.setDimensions(window.innerWidth, window.innerHeight);
};

canvas.appendTo("#root");

canvas.start();

const defaultMotion = new EntityMotion((entity: Entity, frame: CanvasFrame) => {
  EntityMotion.onCollisionWithWall(entity, frame);

  if (handleInterCollision)
    EntityMotion.onCollisionWithEntity(
      entity,
      frame,
      (_distance: number, entity2: Entity) => {
        // entity.x += distance * Math.cos(angle);
        // entity.y += distance * Math.sin(angle);
        // entity2.x -= distance * Math.cos(angle);
        // entity2.y -= distance * Math.sin(angle);
        entity.stats.velocity.add(entity2.stats.velocity);
        entity2.stats.velocity.add(entity.stats.velocity);
      }
    );

  EntityMotion.followVelocity(entity, frame);
});

for (let i = 0; i < quantity; i++) {
  const image = new Image();
  image.src = "/bubble.svg";

  const stats = new EntityStats({
    velocity: new Vector(speed, Math.random() * 2 * Math.PI),
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
