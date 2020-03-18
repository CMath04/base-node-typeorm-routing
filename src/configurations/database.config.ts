import { ConnectionOptions, getConnectionManager, useContainer } from 'typeorm';
import { Container } from 'typedi';
import { logger, TypeOrmLogger } from './logger.config';
import * as EnvConfig from './env.config';
import { DBTypes } from './constants.config';

export async function connect() {
  try {
    logDbConfig();
    useContainer(Container);
    const connection = getConnectionManager().create(getOptions());
    await connection.connect();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

function getOptions(): ConnectionOptions {
  let options: ConnectionOptions = {
    type: EnvConfig.DB_TYPE,
    database: EnvConfig.DB_NAME,
    entities: [__dirname + '/../entities/*.entity.js'],
    synchronize: true,
    logging: 'all',
    logger: new TypeOrmLogger(),
  };

  if (EnvConfig.DB_TYPE !== DBTypes.sqlite) {
    options = Object.assign(options, {
      host: EnvConfig.DB_HOST,
      port: EnvConfig.DB_PORT,
      username: EnvConfig.DB_USERNAME,
      password: EnvConfig.DB_PASSWORD,
    });
  }

  return options;
}

function logDbConfig(): void {
  logger.info('Init database connection');
  logger.info('Database type: ' + EnvConfig.DB_TYPE);
  logger.info('Database name: ' + EnvConfig.DB_NAME);
  if (EnvConfig.DB_TYPE !== DBTypes.sqlite) {
    logger.info('Database host: ' + EnvConfig.DB_HOST);
    logger.info('Database port: ' + EnvConfig.DB_PORT);
    logger.info('Database username: ' + EnvConfig.DB_USERNAME);
  }
}
