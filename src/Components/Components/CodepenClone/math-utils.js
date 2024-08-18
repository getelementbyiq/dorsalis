export function inBounds(position, bounds) {
  return (
    position.left >= bounds.left &&
    position.top >= bounds.top &&
    position.left + position.width <= bounds.left + bounds.width &&
    position.top + position.height <= bounds.top + bounds.height
  );
}
