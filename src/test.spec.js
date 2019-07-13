import { testApi } from './test';

describe('testapi', () => {
  it('testApi', () => {
    expect(testApi()).toBe('This is testApi');
  });
});
