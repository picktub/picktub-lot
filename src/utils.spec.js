import { getRandomInt } from './utils';

const testRepeat = 1;

describe('utils.js', () => {
  beforeEach(() => {

  });

  for (let i = 0; i < testRepeat; i += 1) {
    const min = 0;
    const limit = 8;
    testGetRandomInt(min, limit);
  }
});


function testGetRandomInt(min, limit) {
  it(`getRandomInt() min:${min}, limit:${limit}`, () => {
    const value = getRandomInt(min, limit); // 0 ~ 7까지의 정수 반환

    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(limit - 1);
  });
}
