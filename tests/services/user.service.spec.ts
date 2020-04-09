import { getRepository, QueryFailedError } from 'typeorm';
import { Container } from 'typedi';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { UserService } from '../../src/services';
import { User } from '../../src/entities';
import { UserBuilder } from '../../src/entities/builders';
import { closeConnection, createInMemoryConnection, startTransaction } from '../helper';

describe('User data access', () => {
  const sampleUser = UserBuilder.aNormalUser()
    .withEmail('present@test.com')
    .withFirstname('Present')
    .withLastname('User')
    .withPassword('Str0ngP455woRd')
    .build();

  let transaction: TransactionalTestContext;
  let userService: UserService;

  beforeAll(async () => {
    await createInMemoryConnection();
    const repo = getRepository(User);
    await repo.insert(repo.create(sampleUser));
  });

  afterAll(async () => {
    await closeConnection();
  });

  beforeEach(async () => {
    transaction = await startTransaction();
    userService = Container.get(UserService);
  });

  afterEach(async () => {
    Container.remove(UserService);
    await transaction.finish();
  });

  describe('Get user by mail', () => {
    it('should find the matching user', async () => {
      const found = await userService.getOneByEmail(sampleUser.email);

      expect(found).toMatchObject({
        email: sampleUser.email,
        firstname: sampleUser.firstname,
        lastname: sampleUser.lastname
      });
      expect(found.password).not.toBe(sampleUser.password);
    });

    it('should return undefined when user does not exist', async () => {
      const found = await userService.getOneByEmail('wrong@mail.com');
      expect(found).toBeUndefined();
    });
  });

  describe('Inserting users', () => {
    it('should return the inserted user', async () => {
      const aValidUser = UserBuilder.aNormalUser()
        .withEmail('test.mail@test.com')
        .withFirstname('Super')
        .withLastname('Test')
        .withPassword('password')
        .build();

      const insertedUser = await userService.save(aValidUser);

      expect(insertedUser).toMatchObject({
        email: aValidUser.email,
        firstname: aValidUser.firstname,
        lastname: aValidUser.lastname
      });
      expect(typeof insertedUser.id).toBe('number');
      expect(insertedUser.password).not.toBe(aValidUser.password);
      expect(insertedUser.createdDate).toBeInstanceOf(Date);
      expect(insertedUser.updatedDate).toBeInstanceOf(Date);
    });

    it('should throw error when inserting improper user', () => {
      const anImproperUser = UserBuilder.aNormalUser()
        .withEmail('test.mail@test.com')
        .withPassword('password')
        .build();

      expect(userService.save(anImproperUser)).rejects.toThrow(QueryFailedError);
    });
  });
});

