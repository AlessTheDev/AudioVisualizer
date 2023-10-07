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

function interpolateColor(color1: string, color2: string, percent: number) {
  // Parse the hexadecimal color values into RGB components
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  // Calculate the interpolated RGB values
  const r = Math.round(r1 + (r2 - r1) * (percent / 100));
  const g = Math.round(g1 + (g2 - g1) * (percent / 100));
  const b = Math.round(b1 + (b2 - b1) * (percent / 100));

  // Convert the interpolated RGB values back to hexadecimal format
  const interpolatedColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return interpolatedColor;
}

export default { randomIntFromRange, distance, hasObjectWithType, getFirstObjectWithType, removeFromArray, interpolateColor };
