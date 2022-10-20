export function range(start, end, step = 1) {
  let array = [];
  for (let i = start; i < end; ++i) {
    if (!(i % step)) {
      array.push(i);
    }
  }
  return array;
}