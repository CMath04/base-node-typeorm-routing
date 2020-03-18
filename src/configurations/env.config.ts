import { DBTypes, Env, LogLevels } from './constants.config';
import { resolve } from 'path';

export const NODE_ENV: Env = (process.env.NODE_ENV as Env) || Env.dev;
export const DATA_DIR: string = resolve(process.env.DATA_DIR || __dirname + '/../../dataDir');
export const PORT: number = parseInt(process.env.PORT) || 8080;
export const DB_TYPE: DBTypes = (process.env.DB_TYPE as DBTypes) || DBTypes.sqlite;
export const DB_HOST: string = process.env.DB_HOST;
export const DB_PORT: string = process.env.DB_PORT;
export const DB_USERNAME: string = process.env.DB_USERNAME;
export const DB_PASSWORD: string = process.env.DB_PASSWORD;
export const DB_NAME: string = process.env.DB_NAME || resolve(DATA_DIR + '/database.sqlite');
export const LOG_LEVEL: LogLevels = (process.env.LOG_LEVEL as LogLevels) || (NODE_ENV === Env.prod ? LogLevels.info : LogLevels.debug);
