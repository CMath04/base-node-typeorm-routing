export enum DBTypes {
  mysql = 'mysql',
  mariadb = 'mariadb',
  postgres = 'postgres',
  cockroachdb = 'cockroachdb',
  sqlite = 'sqlite',
  oracle = 'oracle',
  mongodb = 'mongodb',
}

export enum Env {
  dev = 'dev',
  prod = 'prod',
}

export enum LogLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

export const EXPIRES_TIME = 60 * 60;
export const SALTORROUNDS = 10;
