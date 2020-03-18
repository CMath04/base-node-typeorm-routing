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

export interface UserSettings {
  billLayoutColor1: string;
  billLayoutColor2: string;
  billLayoutColor3: string;
  billLayoutTemplate: number;
}
