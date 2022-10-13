import { isDev } from '../enviromentUtils';

describe('environmentUtils', () => {
  it('should return true when environment will not be production', () => {
    expect(isDev).toBeTruthy();
  });
});
