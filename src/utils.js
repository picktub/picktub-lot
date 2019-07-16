// min (포함) 과 max (불포함) 사이의 임의 정수를 반환
function getRandomInt(min, limit) {
  return Math.floor(Math.random() * (limit - min)) + min;
}

/**
 * Covert array to Map Object
 * @param {Array} array - 배열로된 집합
 */
function arrayToMap(array) {
  const map = new Map();

  array.forEach((el, idx) => map.set(idx, el));
  return map;
}

export {
  getRandomInt, arrayToMap,
};
