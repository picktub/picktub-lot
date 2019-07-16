import Lot from './Lot';

describe('Lot', () => {
  beforeEach(() => {

  });

  it('pick() test', () => {
    const set = [1, 3, 5, 7, 9];
    const set2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const set3 = [1, 1, 1, 1, 2];
    const lot = new Lot({ set: set3 });

    expect(lot instanceof Lot).toBe(true); // check created lot

    const picked = lot.pick({ k: 4 });
    // console.log(picked);
  });
});
