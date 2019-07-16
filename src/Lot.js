import { getRandomInt, arrayToMap } from './utils';

class Lot {
  /**
   * @constructor
   * @param {Array} options.set - 원소들의 집합
   */
  constructor({ set }) {
    this.set = set;
  }

  /**
   * set에서 임의의 원소들을 뽑는다.
   * @param {number} option.k - set에서 k개를 뽑는다.
   */
  pick({ k = 1 } = {}) {
    const setMap = arrayToMap(this.set); // copy set to Map form
    const picked = []; // 뽑은 원소를 모아놓은 배열

    for (let pickCount = 0; pickCount < k && setMap.size; pickCount += 1) {
      const { size } = setMap;
      const pickIndex = getRandomInt(0, size); // 0 ~ size-1 까지

      /* set에서 뽑는다. */
      const pickValue = setMap.get(pickIndex);
      picked.push(pickValue);

      /* 위에서 뽑은 pickIndex의 값이 비워지지 않게 마지막index의 값을 pickIndex로 옮긴다. */
      const lastIndex = size - 1;
      if (pickIndex === lastIndex) {
        setMap.delete(lastIndex);
      } else { // swap lastValue <=> pickValue
        const lastValue = setMap.get(lastIndex);
        setMap.delete(lastIndex);
        setMap.set(pickIndex, lastValue);
      }
    }

    return picked;
  }

  getSet() {
    return [...this.set];
  }
}

Lot.exception = (exceptionName) => {
  let errorStr;

  switch (exceptionName) {
    case 'NOT_EXIST_SET': errorStr = 'Set is empty'; break;
    default: errorStr = 'Unknown exception';
  }

  throw new Error(errorStr);
};

export default Lot;
