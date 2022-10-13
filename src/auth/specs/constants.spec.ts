import { jwtConstants } from '../constans';

describe('Constants', () => {
  describe('jwtConstants', () => {
    it('should return jwt value from env file', () => {
      expect(jwtConstants.secret).toBe('secret_json_web_token');
    });
  });
});
