export function isPointInPolygon(point, polygon) {
  let isInside = false;
  let j = polygon.length - 1;
  for (let i = 0; i < polygon.length; i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > point[1]) !== (yj > point[1])) &&
      (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    if (intersect) isInside = !isInside;
    j = i;
  }
  return isInside;
}
