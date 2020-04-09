import { Connection, createConnection, getConnection, useContainer } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';
import { Container } from 'typedi';
import * as entities from '../src/entities';

export async function createInMemoryConnection(): Promise<Connection> {
  useContainer(Container);
  return createConnection({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [...Object.values(entities)],
    synchronize: true,
    logging: false
  });
}

export async function closeConnection(): Promise<void> {
  const connection = getConnection();
  return connection.close();
}

export async function startTransaction(): Promise<TransactionalTestContext> {
  const connection = getConnection();
  const transactionalContext = new TransactionalTestContext(connection);
  await transactionalContext.start();
  return transactionalContext;
}
