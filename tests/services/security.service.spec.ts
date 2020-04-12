import { JsonWebTokenError } from 'jsonwebtoken';
import { Container } from 'typedi';
import { SecurityService } from '../../src/services';
import { TokenPayload } from '../../src/typing';

describe('Token verification', () => {
  const securityService = Container.get(SecurityService);

  it('should verify correct token', async () => {
    const JWT_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    const payload: TokenPayload = {
      email: 'test.mail@test.com',
      id: 1,
    };
    const token = await securityService.generateToken(payload);
    const decoded = await securityService.verifyToken(token);

    expect(token).toMatch(JWT_REGEX);
    expect(Object.keys(decoded).sort()).toEqual(['id', 'email', 'iat'].sort());
    expect(decoded).toMatchObject(payload);
  });

  it('should throw error on malformed token', () => {
    const aMalFormedToken = 'a malformed token';

    expect(securityService.verifyToken(aMalFormedToken)).rejects.toThrow(new JsonWebTokenError('jwt malformed'));
  });
});
