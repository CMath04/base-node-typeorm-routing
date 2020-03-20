import { createLogger, format, LoggerOptions, transports } from 'winston';
import { Logger, QueryRunner } from 'typeorm';
import { DATA_DIR, LOG_LEVEL } from './env.config';

const { combine, errors, timestamp, printf, colorize } = format;

const customFormat = printf(info => {
  const log = `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`;
  return info.stack ? `${log}\n${info.stack}` : log;
});

const options: LoggerOptions = {
  level: LOG_LEVEL,
  format: combine(errors({ stack: true }), timestamp()),
  transports: [
    new transports.File({ filename: DATA_DIR + '/logs/server.log', maxsize: 10000000, format: customFormat }),
    new transports.Console({ format: combine(customFormat, colorize({ all: true })) }),
  ],
};

export const logger = createLogger(options);

export class TypeOrmLogger implements Logger {
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    logger.log(level, message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.debug(`Query: ${query}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.warn(`The query "${query}" executed slowly in ${time}ms`);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    let message = error;
    message += `\n\tWith query: ${query}`;
    if (parameters && parameters.length > 0) {
      message += `\n\tWith params: ${parameters}`;
    }
    logger.error(message);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    logger.info(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    logger.info(message);
  }
}
