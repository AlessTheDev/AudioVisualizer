import GameObject from "./objects/GameObject";

function randomIntFromRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity: { x: number, y: number }, angle: number) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };

  return rotatedVelocities;
}

function hasObjectWithType(array: GameObject[], type: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].type == type) { return true }
  }
  return false;
}

function getFirstObjectWithType(array: GameObject[], type: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].type == type) { return array[i] }
  }
  return null;
}

function removeFromArray(array: Array<any>, obj: any) {
  const index = array.indexOf(obj, 0);
  if (index > -1) {
    array.splice(index, 1);
  }
}

export default { randomIntFromRange, distance, hasObjectWithType, getFirstObjectWithType, removeFromArray };
